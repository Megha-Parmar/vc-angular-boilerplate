import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { Constants, MessageConstant, messageType } from 'src/app/core/constants/app.constants';
import { ListingModel } from 'src/app/core/models/category.model';
import { EventListModel, HomePageModel } from 'src/app/core/models/event.model';
import { EventService } from 'src/app/core/services/event.service';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { PopupOpenService } from 'src/app/core/services/popup-open.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit, OnDestroy {
  eventForm!: FormGroup;
  eventId: string = '';
  editId!: string;
  updateEventId!: string;
  horizonBannerImage!: string;
  verticalBannerImg!: string;
  featuredImage!: string;
  formattedaddress!: string;
  eventInfo!: EventListModel;
  homePageInfo!: HomePageModel;
  amenitiesList: ListingModel[] = [];
  selectedAmenities: ListingModel[] = [];
  selected: number = Number(0);
  currentDate = new Date();
  isSubVenue: boolean = false;
  selectable: boolean = true;
  removable: boolean = true;
  isTabEnable: boolean = Boolean(false);
  separatorKeysCodes: number[] = [ENTER, COMMA];
  acceptFileType = MessageConstant.ImageType.AcceptType;
  amenitiesOption = Constants.AmenitiesOption;
  ckeConfig = Constants.CkEditorConfig;
  @ViewChild('autocompleteTrigger') matACTrigger!: MatAutocompleteTrigger;
  @ViewChild('addresstext') addresstext!: ElementRef;
  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private geoLocationService: GeoLocationService,
    private toasterService: ToasterService,
    private popupOpenService: PopupOpenService
  ) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.eventId = this.updateEventId = this.activatedRoute.snapshot.paramMap.get('id') as string;
      this.getEventDetailsById();
    } else if (this.activatedRoute.snapshot.queryParams['id']) {
      this.editId = this.activatedRoute.snapshot.queryParams['id'];
      this.getEventDetailsById();
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      horizontal_banner_image: new FormControl('', [Validators.required]),
      vertical_banner_image: new FormControl('', [Validators.required]),
      venue: new FormControl(''),
      tagline: new FormControl('', [Validators.required]),
      access_ticket_count: new FormControl(null, [Validators.required]),
      is_featured: new FormControl(false),
      featured_image: new FormControl(null),
      amenities: new FormControl(null),
      is_banner: new FormControl(false),
      city: new FormControl(''),
      state: new FormControl(''),
      pincode: new FormControl(''),
      venueType: new FormControl('onsite'),
      venue_type: new FormControl(),
      venue_url: new FormControl('', Validators.pattern(Constants.generalConstant.urlPattern)),
      sub_venue: new FormControl(),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    if (this.updateEventId) {
      this.eventForm.controls['start_date']?.valueChanges.subscribe(() => {
        this.eventForm.controls['start_date'].setValidators(null);
      });
    }
    this.getHomePageBannerInfo();
    this.getAmenitiesList();
  }

  setFormValue(formValue: any): void {
    this.eventForm.patchValue({
      title: formValue.title,
      description: formValue.description,
      horizontal_banner_image: formValue.banner_hz_name,
      vertical_banner_image: formValue.banner_vr_name,
      venue: formValue.venue,
      tagline: formValue.tagline,
      access_ticket_count: formValue.access_ticket_count,
      is_featured: formValue.is_featured,
      featured_image: formValue.featured_im_name,
      is_banner: formValue.is_banner,
      city: formValue.city,
      state: formValue.state,
      pincode: formValue.pincode,
      amenities: formValue.amenities,
      start_date: new Date(formValue.start_date),
      end_date: new Date(formValue.end_date),
      venue_url: formValue.venue_url,
      sub_venue: formValue.sub_venue,
      venueType: formValue.venue_type
    });
    this.selectedAmenities = formValue.amenities;
    if (formValue.sub_venue) {
      this.isSubVenue = true;
    }
    if (formValue.horizontal_banner_image) {
      this.horizonBannerImage = formValue.horizontal_banner_image;
    }
    if (formValue.vertical_banner_image) {
      this.verticalBannerImg = formValue.vertical_banner_image;
    }
    if (formValue.featured_image) {
      this.featuredImage = formValue.featured_image;
    }
    this.eventForm.markAllAsTouched();
  }

  get getForm() {
    return this.eventForm.controls;
  }

  onTabChange(event: number): void {
    if (event === 2) {
      this.isTabEnable = true;
    }
    if (event === 0 && this.eventInfo.uuid && !this.updateEventId) {
      this.editId = this.eventInfo.uuid;
      this.router.navigate([`/event/add`], {
        queryParams: { id: this.eventInfo.uuid },
      });
    }
  }

  getEventDetailsById(): void {
    let id = this.updateEventId ? this.updateEventId : this.editId;
    this.eventService.getEventById(id).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (res) => {
        if (res) {
          this.setFormValue(res.data);
          this.eventInfo = res.data;
        }
      }
    });
  }

  getAmenitiesList(): void {
    this.eventService.getAmenitiesList().pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (res) => {
        if (res) {
          this.amenitiesList = res.data;
        }
      },
    });
  }

  getHomePageBannerInfo(): void {
    this.eventService.getIsFeaturedSectionInfo().pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (resp) => {
        this.homePageInfo = resp.data;
      },
    });
  }

  onSelect(event: boolean, type: string): void {
    if (event) {
      if (event && type === 'is_featured') {
        this.openConfirmationPopup();
      } else if (event && type === 'is_banner') {
        this.openBannerConfirmationPopup();
      }
    }
  }

  openConfirmationPopup(): void {
    const commonData = {
      title: 'eventAddEditPage.featureBannerTitle',
      detail: `eventAddEditPage.isFeaturedBannerUpdateConfirmation`,
      // highLightedText: `${name} ?`,
      okText: 'Ok',
      cancelText: 'Cancel',
      type: 'inactivity'
    };
    const dialogRef = this.popupOpenService.openPopup(ConfirmationComponent, commonData, '500px', true);
    // const dialogRef = this.matDialog.open(HomepageConfirmationPopupComponent, {
    //   data: {
    //     title: 'eventAddEditPage.featureBannerTitle',
    //     confirmationText: 'eventAddEditPage.isFeaturedBannerUpdateConfirmation',
    //   },
    // });
    dialogRef.afterClosed().subscribe((resp: boolean) => {
      if (resp) {
        this.eventForm.controls['is_featured'].setValue(true);
      } else {
        this.eventForm.controls['is_featured'].setValue(false);
      }
    });
  }

  openBannerConfirmationPopup(): void {
    const commonData = {
      title: 'eventAddEditPage.homePageBannerTitle',
      detail: `eventAddEditPage.isBannerUpdateConfirmation`,
      // highLightedText: `${name} ?`,
      okText: 'Ok',
      cancelText: 'Cancel',
      type: 'inactivity'
    };
    const dialogRef = this.popupOpenService.openPopup(ConfirmationComponent, commonData, '500px', true);
    // const dialogRef = this.matDialog.open(HomepageConfirmationPopupComponent, {
    //   data: {
    //     title: 'eventAddEditPage.homePageBannerTitle',
    //     confirmationText: 'eventAddEditPage.isBannerUpdateConfirmation',
    //   },
    // });
    dialogRef.afterClosed().subscribe((resp: boolean) => {
      if (resp) {
        this.eventForm.controls['is_banner'].setValue(true);
      } else {
        this.eventForm.controls['is_banner'].setValue(false);
      }
    });
  }

  selectedItem(event: MatAutocompleteSelectedEvent): void {
    const selectedAmemnities = this.selectedAmenities.map(e => e.uuid);
    if (selectedAmemnities.includes(event.option.value)) {
      return;
    } else {
      const newAmemnities = this.amenitiesList.find(e => {
        if (e.uuid === event.option.value) {
          e.checked = true;
          e.is_allowed = true;
          return true;
        }
        return false;
      });
      if (newAmemnities) {
        this.selectedAmenities.push(newAmemnities);
        const removeitem = this.amenitiesList.indexOf(newAmemnities);
        this.amenitiesList.splice(removeitem, 1);
      }
    }
    this.mapAmenity();
  }

  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address;
    const locationValue: any = this.geoLocationService.getLocationDetails(
      address.address_components
    );
    if (this.formattedaddress) {
      this.eventForm.controls['venue'].setValue(this.formattedaddress);
      this.eventForm.controls['city'].setValue(locationValue.city);
      this.eventForm.controls['state'].setValue(locationValue.state);
      this.eventForm.controls['pincode'].setValue(locationValue.pincode);
    }
  }

  onFileSelect(event: any, type: number): void {
    const file: File = event.target.files[0];
    const img = new Image();
    const reader = new FileReader();
    if (file) {
      if (type === 1) {
        reader.onload = (reload: any) => {
          img.src = reader.result as string;
          img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            if (width !== 800 && height !== 450) {
              this.toasterService.displaySnackBar(
                MessageConstant.errorMessage.horizonBannerSize,
                messageType.error
              );
              return;
            }
            const imageUrl = reload.target.result;
            this.eventForm.controls['horizontal_banner_image'].setValue(
              imageUrl
            );
            this.horizonBannerImage = reader.result as string;
          };
        };
      } else if (type === 2) {
        reader.onload = (reload: any) => {
          img.src = reader.result as string;
          img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            if (width !== 200 && height !== 300) {
              this.toasterService.displaySnackBar(
                MessageConstant.errorMessage.verticalBannerSize,
                messageType.error
              );
              return;
            }
            const imageUrl = reload.target.result;
            this.eventForm.controls['vertical_banner_image'].setValue(imageUrl);
            this.verticalBannerImg = reader.result as string;
          };
        };
      } else if (type === 3) {
        reader.onload = (reload: any) => {
          img.src = reader.result as string;
          img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            if (width !== 1360 && height !== 120) {
              this.toasterService.displaySnackBar(
                MessageConstant.errorMessage.featureBannerSize,
                messageType.error
              );
              return;
            }
            const imageUrl = reload.target.result;
            this.eventForm.controls['featured_image'].setValue(imageUrl);
            this.featuredImage = reader.result as string;
          };
        };
      }
      reader.readAsDataURL(file);
    }
  }

  selectFullDay(event: any): void {
    if (event.checked) {
      this.eventForm.controls['access_ticket_count'].setValue(0);
    } else {
      this.eventForm.controls['access_ticket_count'].setValue('');
    }
  }

  getValue(value: any, amenities: ListingModel): void {
    this.selectedAmenities.forEach((item) => {
      if (item.uuid === amenities.uuid) {
        item.is_allowed = value.value;
      }
    });
    this.mapAmenity();
  }

  mapAmenity(): void {
    let selectedAmentity: any[] = [];
    this.selectedAmenities.map((item) => {
      selectedAmentity.push({
        uuid: item.uuid,
        is_allowed: item.is_allowed,
      });
    });
    this.eventForm.controls['amenities'].setValue(selectedAmentity);
  }

  openAuto(trigger: MatAutocompleteTrigger) {
    trigger.openPanel();
  }

  remove(item: any): void {
    const index = this.selectedAmenities.indexOf(item);
    if (index >= 0) {
      this.selectedAmenities.splice(index, 1);
      this.amenitiesList.forEach((element) => {
        if (element.uuid === item.uuid) {
          element.checked = false;
        }
      });
    }
  }

  onSubmit(): void {
    console.log(this.eventForm.value)
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

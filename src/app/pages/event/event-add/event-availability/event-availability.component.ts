import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { Constants, MessageConstant, messageType } from 'src/app/core/constants/app.constants';
import { EventListModel, EventPrice, EventSlot } from 'src/app/core/models/event.model';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { EventService } from 'src/app/core/services/event.service';
import { PopupOpenService } from 'src/app/core/services/popup-open.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-event-availability',
  templateUrl: './event-availability.component.html',
  styleUrls: ['./event-availability.component.scss']
})
export class EventAvailabilityComponent implements OnInit, OnDestroy {

  eventAvailabilityForm!: FormGroup;
  eventTypeOption = Constants.EventTypeOption;
  slotSelectionOption = Constants.SlotSection;
  addButton: string = String('Add');
  addEditEvent: string = String('Add');
  formName: string = String('event_availability');
  isEventSlotDisable = false;
  eventType!: number;
  index!: number;

  minDate!: Date;
  maxDate!: Date;
  minTime: any;
  maxTime: any;

  eventSlot: EventSlot[] = [];
  eventPrice: EventPrice[] = [];
  deletedEventSlot: EventSlot[] = [];
  deletedEventPrice: EventPrice[] = [];

  @Input() selectedIndex!: number;
  @Input() editId!: string;
  @Input() eventInfo!: EventListModel;
  @Input() eventId!: string;

  unSubscriber: Subject<void> = new Subject();

  constructor(
    readonly dateService: DateFormatService,
    private toaster: ToasterService,
    private tab: MatTabGroup,
    private eventService: EventService,
    private router:Router,
    private popUpService: PopupOpenService
  ) { }


  ngOnInit(): void {
    this.intializeForm();
    if (this.eventId || this.editId) {
      this.setFormData();
    }
  }

  intializeForm(): void {
    this.eventAvailabilityForm = new FormGroup({
      event_type: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      start_time: new FormControl(''),
      end_time: new FormControl(''),
      capacity: new FormControl('', [Validators.required]),
      category_name: new FormControl('', [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      remark: new FormControl(''),
      event_date: new FormControl(null),
      filterValue: new FormControl(''),
      currency: new FormControl('INR'),
      is_repeat: new FormControl(true),
    });
  }

  setFormData(): void {
    const eventValue = this.eventInfo?.event_timeslots[0];
    if (eventValue.event_type === 'fulltime') {
      this.eventType = 0;
      this.eventAvailabilityForm.patchValue({
        event_type: 0,
        startTime: this.convertTimetoDate(eventValue.start_time),
        endTime: this.convertTimetoDate(eventValue.end_time as string),
        capacity: eventValue.capacity,
        event_date: null
      })
    } else {
      // this.eventAvailabilityForm.controls['event_type'].setValue(1);
      this.isEventSlotDisable = true;
    }
    this.setFormValue()
  }

  setFormValue(): void {
    this.eventSlot = [];
    this.eventPrice = [];
    this.eventInfo?.event_timeslots?.forEach((element) => {
      this.eventSlot.push({
        uuid: element.uuid,
        is_deleted: false,
        event_type: element.event_type === 'slotwise' ? 1 : 0,
        event_date: element.event_date,
        start_time: element.start_time,
        end_time: element.end_time,
        capacity: element.capacity,
        // timezone: element.timezone,
        is_repeat: element.is_repeat,
      });
    });
    this.eventInfo?.event_price?.forEach((element) => {
      this.eventPrice.push({
        uuid: element.uuid,
        is_deleted: false,
        category_name: element.category_name,
        price: element.price,
        remark: element.remark,
        currency: element.currency,
      });
    });
    this.onStartTime();
    this.onEndTime();
  }

  onCancel(): void {
    this.tab.selectedIndex = 0;
  }

  onStartTime(): void {
    if (this.eventAvailabilityForm.controls['startTime'].value) {
      this.minTime = new Date(new Date(this.eventAvailabilityForm.controls['startTime'].value).getTime() + 5 * 60000);
    }
  }

  onEndTime(): void {
    if (this.eventAvailabilityForm.controls['endTime'].value) {
      this.maxTime = new Date(new Date(this.eventAvailabilityForm.controls['endTime'].value).getTime() - 5 * 60000);
    }
  }

  onSelectionChange(event: any): void {
    if (event.source.value === true) {
      this.eventAvailabilityForm.controls['event_date'].setValue(null);
      this.eventAvailabilityForm.controls['event_date'].disable();
    } else {
      this.eventAvailabilityForm.controls['event_date'].enable();
    }
  }

  checkEventType(event: string | number | undefined): any {
    if (event) {
      if (typeof event === 'string') {
        return event;
      } else {
        return this.eventTypeOption[event].viewValue;
      }
    }
  }

  selectEventType(event: any) {
    console.log(event);

    this.eventType = event.value;
    if (event === 0) {
      this.isEventSlotDisable = false;
    }
    this.eventAvailabilityForm.controls['event_type'].setValue(event.value);
    this.eventSlot.forEach((e, i) => {
      if (event.value === 0 && e.event_type === 1) {
        this.deleteSlotPrice(e, 'slot', i)
      }
      else if (event.value === 1 && e.event_type === 0) {
        this.deleteSlotPrice(e, 'slot', i)
      }
    })
  }

  editSlotPrice(slot: any, index: number, type: string) {
    this.index = index;
    if (type === 'slot') {
      let eventType;
      this.eventType = 1;
      this.addButton = 'Edit';
      if (slot.event_type === 'fulltime' || slot.event_type === 0) {
        eventType = 0;
      } else {
        eventType = 1;
      }
      this.eventAvailabilityForm.controls['event_type'].setValue(eventType);
      this.eventAvailabilityForm.controls['event_date'].setValue(
        slot.event_date ? this.dateService.getDateFormat(slot.event_date) : null
      );
      this.eventAvailabilityForm.controls['startTime'].setValue(
        this.convertTimetoDate(slot.start_time)
      );
      this.eventAvailabilityForm.controls['endTime'].setValue(
        this.convertTimetoDate(slot.end_time)
      );
      this.eventAvailabilityForm.controls['capacity'].setValue(slot.capacity);
      this.eventAvailabilityForm.controls['is_repeat'].setValue(slot.is_repeat);
    } else {
      this.addEditEvent = 'Edit';
      this.eventAvailabilityForm.controls['category_name'].setValue(
        slot.category_name
      );
      this.eventAvailabilityForm.controls['price'].setValue(slot.price);
      this.eventAvailabilityForm.controls['remark'].setValue(slot.remark);
    }
  }

  convertTimetoDate(date: string): Date {
    const setTime = this.dateService.convertTimetoDateFormat(date);
    return setTime;
  }

  addSlotPrice(type: string) {
    this.setTimeValue();
    if (type === 'slot') {
      let obj = {
        event_type: this.eventAvailabilityForm.value.event_type,
        start_time: this.eventAvailabilityForm.value.start_time,
        end_time: this.eventAvailabilityForm.value.end_time,
        capacity: this.eventAvailabilityForm.value.capacity,
        event_date: this.eventAvailabilityForm.value.event_date ? this.dateService.getDateFormat(this.eventAvailabilityForm.value.event_date) : null,
        is_repeat: this.eventAvailabilityForm.value.is_repeat,
      };
      const isValid = this.dateService.isDateTimeIsSame(obj.start_time, obj.end_time, obj.event_date, this.eventSlot);
      if (isValid) {
        this.toaster.displaySnackBar("Please enter valid time slot", "error");
        return
      }
      this.eventSlot.push(obj);
      this.resetEventSlot();
    } else {
      let obj = {
        category_name: this.eventAvailabilityForm.value.category_name,
        price: this.eventAvailabilityForm.value.price,
        remark: this.eventAvailabilityForm.value.remark,
        currency: this.eventAvailabilityForm.value.currency,
      };
      this.eventPrice.push(obj);
      this.resetEventPrice();
    }
  }

  resetEventSlot(): void {
    this.eventAvailabilityForm.controls['startTime'].reset();
    this.eventAvailabilityForm.controls['endTime'].reset();
    this.eventAvailabilityForm.controls['capacity'].reset();
    this.eventAvailabilityForm.controls['event_date'].reset();
    this.minTime = undefined;
    this.maxTime = undefined;
  }

  resetEventPrice(): void {
    this.eventAvailabilityForm.controls['category_name'].reset();
    this.eventAvailabilityForm.controls['price'].reset();
    this.eventAvailabilityForm.controls['remark'].reset();
    this.addEditEvent = 'Add';
  }

  setTimeValue(): void {
    const startTime = this.dateService.getTimeFormat(
      this.eventAvailabilityForm.value.startTime
    );
    const endTime = this.dateService.getTimeFormat(
      this.eventAvailabilityForm.value.endTime
    );
    this.eventAvailabilityForm.controls['start_time'].setValue(startTime);
    this.eventAvailabilityForm.controls['end_time'].setValue(endTime);
  }

  updateSlotPrice(type: string) {
    if (this.index != -1) {
      if (type === 'slot') {
        const startTime = this.dateService.getTimeFormat(
          this.eventAvailabilityForm.value.startTime
        );
        const endTime = this.dateService.getTimeFormat(
          this.eventAvailabilityForm.value.endTime
        );
        this.eventSlot[this.index].event_type =
          this.eventAvailabilityForm.value.event_type;
        this.eventSlot[this.index].event_date =
          this.eventAvailabilityForm.value.event_date ? this.dateService.getDateFormat(this.eventAvailabilityForm.value.event_date) : null;
        this.eventSlot[this.index].start_time = startTime;
        this.eventSlot[this.index].end_time = endTime;
        this.eventSlot[this.index].capacity =
          this.eventAvailabilityForm.value.capacity;
        this.eventSlot[this.index].is_repeat =
          this.eventAvailabilityForm.value.is_repeat;
        this.resetEventSlot();
        this.index;
        this.addButton = 'Add';
      } else {
        this.eventPrice[this.index].category_name =
          this.eventAvailabilityForm.get('category_name')?.value;
        this.eventPrice[this.index].price =
          this.eventAvailabilityForm.get('price')?.value;
        this.eventPrice[this.index].remark =
          this.eventAvailabilityForm.get('remark')?.value;
        this.resetEventPrice();
        this.index;
        this.addEditEvent = 'Add';
      }
    }
  }

  deleteSlotPrice(data: any, type: string, index: number) {
    if (type === 'slot') {
      if (data.uuid) {
        this.deletedEventSlot.push({
          uuid: data.uuid,
          is_deleted: true,
          event_type: data.event_type,
          event_date: data.event_date,
          start_time: data.start_time,
          end_time: data.end_time,
          capacity: data.capacity,
          // timezone: data.timezone,
          is_repeat: data.is_repeat,
        });
      }
      this.eventSlot.splice(index, 1);
    } else {
      if (data.uuid) {
        this.deletedEventPrice.push({
          uuid: data.uuid,
          is_deleted: true,
          category_name: data.category_name,
          price: data.price,
          remark: data.remark,
          currency: data.currency,
        });
      }
      this.eventPrice.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.eventAvailabilityForm.value.event_type === "" && this.eventSlot.length === 0) {
      this.toaster.displaySnackBar(MessageConstant.errorMessage.invalidForm, messageType.error)
      return
    }
    this.setTimeValue();
    if (this.eventSlot.length === 0) {
      let obj = {
        event_type: this.eventAvailabilityForm.get('event_type')?.value,
        event_date: this.eventAvailabilityForm.value.event_date ? this.dateService.getDateFormat(this.eventAvailabilityForm.get('event_date')?.value) : null,
        start_time: this.eventAvailabilityForm.get('start_time')?.value,
        end_time: this.eventAvailabilityForm.get('end_time')?.value,
        capacity: this.eventAvailabilityForm.get('capacity')?.value,
        // timezone: this.eventAvailabilityForm.get('timezone')?.value,
        is_repeat: this.eventAvailabilityForm.get('is_repeat')?.value,
      };
      this.eventSlot.push(obj);
    }
    if (this.eventPrice.length === 0) {
      let obj = {
        category_name: this.eventAvailabilityForm.get('category_name')?.value,
        price: this.eventAvailabilityForm.get('price')?.value,
        remark: this.eventAvailabilityForm.get('remark')?.value,
        currency: this.eventAvailabilityForm.get('currency')?.value,
      };
      this.eventPrice.push(obj);
    }
    this.formValidation();
    if (this.eventInfo && this.eventInfo?.is_published) {
      this.updateEvent(this.eventInfo.is_published);
    } else {
      this.popupConfirmation();
    }
  }

  popupConfirmation(): void {
    const commonData = {
      detail: 'eventAddEditPage.confirmationPopup',
      // highLightedText: `${name} ?`,
      okText: 'Ok',
      cancelText: 'Cancel',
      type: 'inactivity'
    }
    const dialogRef = this.popUpService.openPopup(ConfirmationComponent, commonData, '90%', true , {
      panelClass: 'custom-modal',
      maxWidth: '500px',
    });
    dialogRef.afterClosed().subscribe((resp: boolean) => {
      if (resp) {
        this.updateEvent(resp);
      }
    });

    // const dialogRef = this.matDialog.open(ConfirmationPopupComponent, {
    //   data: 'eventAddEditPage.confirmationPopup',
    // });
    // dialogRef.afterClosed().subscribe((resp: boolean) => {
    //   this.updateEvent(resp);
    // });
  }

  formValidation() {
    if (this.eventSlot.length > 0) {
      this.eventAvailabilityForm.controls['event_type'].clearValidators();
      this.eventAvailabilityForm.get('event_type')?.updateValueAndValidity();
      this.eventAvailabilityForm.controls['startTime'].clearValidators();
      this.eventAvailabilityForm.get('startTime')?.updateValueAndValidity();
      this.eventAvailabilityForm.controls['endTime'].clearValidators();
      this.eventAvailabilityForm.get('endTime')?.updateValueAndValidity();
      this.eventAvailabilityForm.controls['capacity'].clearValidators();
      this.eventAvailabilityForm.get('capacity')?.updateValueAndValidity();
    }
    if (this.eventPrice.length > 0) {
      this.eventAvailabilityForm.controls['category_name'].clearValidators();
      this.eventAvailabilityForm.get('category_name')?.updateValueAndValidity();
      this.eventAvailabilityForm.controls['price'].clearValidators();
      this.eventAvailabilityForm.get('price')?.updateValueAndValidity();
      this.eventAvailabilityForm.controls['remark'].clearValidators();
      this.eventAvailabilityForm.get('remark')?.updateValueAndValidity();
    }
    if (this.eventType === 1) {
      this.resetEventSlot();
    }
    this.resetEventPrice();
  }

  updateEvent(publishedValue: boolean): void {
    if (this.eventType === 0) {
      let data: any;
      const filterdata: EventSlot[] = this.eventSlot.map((event) => {
        if (event.uuid) {
          data = {
            event_type: 0,
            start_time: this.eventAvailabilityForm.value.start_time,
            end_time: this.eventAvailabilityForm.value.end_time,
            capacity: this.eventAvailabilityForm.value.capacity,
            uuid: event.uuid,
            is_deleted: false,
          };
        } else {
          data = {
            event_type: 0,
            start_time: this.eventAvailabilityForm.value.start_time,
            end_time: this.eventAvailabilityForm.value.end_time,
            capacity: this.eventAvailabilityForm.value.capacity,
          };
        }
        return data;
      });
      this.eventSlot = [];
      this.eventSlot = filterdata;
    }
    const param = {
      event_availability: {
        event_timeslots: this.eventSlot.concat(this.deletedEventSlot),
        event_prices: this.eventPrice.concat(this.deletedEventPrice),
      },
      published: publishedValue,
    };
    this.eventService
      .updateEvent(this.eventInfo.uuid, this.formName, param)
      .pipe(takeUntil(this.unSubscriber))
      .subscribe({
        next: (res) => {
          if (publishedValue === false || (publishedValue === true && this.eventId)) {
            this.tab.selectedIndex = 2;
          } else {
            if(this.eventId){
              this.toaster.displaySnackBar(
                MessageConstant.successMessage.eventUpdatedSuccessfully,
                messageType.success
              );
            }else{
              this.toaster.displaySnackBar(
                MessageConstant.successMessage.eventCreatedSuccessfully,
                messageType.success
              );
            }
            this.router.navigate(['/event/list']);
          }
        },
        error: (error: any) => {
          this.toaster.displaySnackBar(MessageConstant.errorMessage.dateEventNotFound, messageType.error)
        },
      });
  }

  ngOnDestroy(): void {
    if (this.unSubscriber) {
      this.unSubscriber.complete();
      this.unSubscriber.next();
    }
  }

}

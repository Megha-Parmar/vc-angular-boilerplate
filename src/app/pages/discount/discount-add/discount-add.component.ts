import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take } from 'rxjs';
import { Constants, MessageConstant, messageType } from 'src/app/core/constants/app.constants';
import { CurrencyModel } from 'src/app/core/models/discount.model';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { DiscountService } from 'src/app/core/services/discount.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.scss']
})
export class DiscountAddComponent implements OnInit, OnDestroy {

  discountId: string = '';
  discountTypeBy: string = '';
  selectable = true;
  removable = true;
  isViewPage = false;
  currencyList!: CurrencyModel[];
  discountForm!: FormGroup;
  currentDate: Date = new Date();
  discountOn = Constants.DiscountOn;
  discountType = Constants.DiscountType;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ckeConfig = Constants.CkEditorConfig

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private dateService: DateFormatService,
    private _toasterService: ToasterService,
    private _discountService: DiscountService,
  ) {
    if (this._activatedRoute.snapshot.paramMap.get('id')) {
      this.discountId = this._activatedRoute.snapshot.paramMap.get('id') as string;
    }
    if (this._router.url.includes('view')) {
      this.isViewPage = true;
    }
    this.initializeForm();
    if (this.discountId) {
      this.getDiscountById();
    }
  }

  getDiscountById(): void {
    this._discountService.getDiscountById(this.discountId).subscribe({
      next: (res => {
        this.setFormValue(res.data);
      })
    })
  }

  setFormValue(value: any): void {
    this.discountForm.patchValue({
      title: value.title,
      description: value.description,
      remarks: value.remarks,
      terms_and_conditions: value.terms_and_conditions,
      discount_type: value.discount_type === 'percentage' ? 0 : 1,
      discount_value: value.discount_value,
      max_value: value.max_value,
      discount_code: value.discount_code,
      discount_on: value.discount_on === 'quantity' ? 0 : 1,
      max_avail_limit_per_user: value.max_avail_limit_per_user,
      start_date: new Date(value.start_date),
      end_date: new Date(value.end_date),
      min_quantity: value.min_quantity,
      min_amount: value.min_amount,
      max_avail_limit_of_coupon_code: value.max_avail_limit_of_coupon_code,
      published: value.is_published
    })
    this.discountTypeBy = value.discount_type;
    // this.selectedEvent = value.events.filter((event: any) => event.deleted_at === null || event.deleted_at === undefined);
    // this.eventList?.forEach(event => {
    //   this.selectedEvent?.forEach(item => {
    //     if (event.uuid === item.uuid) {
    //       event.checked = true;
    //     }
    //   })
    // })
    if (value.is_published === true) {
      this.discountForm.disable();
    }
    this.discountForm.markAllAsTouched();
  }

  initializeForm(): void {
    this.discountForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
      terms_and_conditions: new FormControl('', [Validators.required]),
      discount_type: new FormControl([Validators.required]),
      discount_value: new FormControl(null, [Validators.required]),
      max_value: new FormControl(),
      discount_code: new FormControl('', [Validators.required]),
      discount_on: new FormControl([Validators.required]),
      max_avail_limit_per_user: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      min_quantity: new FormControl(),
      min_amount: new FormControl(null, [Validators.required]),
      max_avail_limit_of_coupon_code: new FormControl(null, [Validators.required]),
      published: new FormControl(false)
    });
    if (this.discountId) {
      this.discountForm.controls['start_date']?.valueChanges.subscribe(() => {
        this.discountForm.controls['start_date'].setValidators(null);
      });
    }
  }

  get getForm() {
    return this.discountForm.controls;
  }

  ngOnInit(): void {
  }

  onChange(): void {
    this.discountForm.controls['discount_value'].reset();
    if (this.discountForm.value.discount_type == 0) {
      this.discountTypeBy = 'percentage';
      this.discountForm.controls['max_value'].setValidators([Validators.required]);
    } else {
      this.discountTypeBy = 'flat';
      this.discountForm.controls['max_value'].clearValidators();
    }
    this.discountForm.controls['max_value'].updateValueAndValidity(); //for the changes to take effect
  }

  onSelect(event: any) {
    this.discountForm.controls['min_amount'].setValue(null);
    if (event.value === 0) {
      this.discountForm.controls['min_quantity'].setValidators([Validators.required]);
    }
    this.discountForm.controls['min_amount'].updateValueAndValidity();
  }

  onSubmit(type: String): void {
    console.log(type);
    if (this.discountForm.invalid) {
      return
    }
    if (type === 'publish') {
      this.discountForm.controls['published'].setValue(true);
    }
    if ((this.discountForm.value.max_value === null || this.discountForm.value.max_value === 0) && this.discountForm.value.discount_type === 0) {
      this._toasterService.displaySnackBar(MessageConstant.errorMessage.discountMaxPercentage, messageType.error);
      return;
    }
    if (this.discountForm.value.discount_type == 0 && this.discountForm.value.discount_value > 100) {
      this._toasterService.displaySnackBar(MessageConstant.errorMessage.discountPercentagecgreater, messageType.error);
      return;
    }
    this.setBlankField();
    this.setValidDate();
    if (this.discountId) {
      this.updateDiscount();
    } else {
      this.addDiscount();
    }
  }

  setBlankField(): void {
    if (this.discountForm.value.max_value === null) {
      this.discountForm.controls['max_value'].setValue(0);
    }
    if (this.discountForm.value.min_quantity === null) {
      this.discountForm.controls['min_quantity'].setValue(0);
    }
    if (this.discountForm.value.min_amount === null) {
      this.discountForm.controls['min_amount'].setValue(0);
    }
    if (this.discountForm.value.max_avail_limit_per_user === null) {
      this.discountForm.controls['max_avail_limit_per_user'].setValue(0);
    }
    if (this.discountForm.value.max_avail_limit_of_coupon_code === null) {
      this.discountForm.controls['max_avail_limit_of_coupon_code'].setValue(0);
    }
  }

  setValidDate(): void {
    const startDate = this.dateService.getDateFormat(
      this.discountForm.controls['start_date'].value
    );
    const endDate = this.dateService.getDateFormat(
      this.discountForm.controls['end_date'].value
    );
    this.discountForm.controls['start_date'].setValue(startDate);
    this.discountForm.controls['end_date'].setValue(endDate);
  }

  addDiscount(): void {
    this._discountService.addDiscount(this.discountForm.value).pipe(take(1)).subscribe({
      next: () => {
        if (this.discountForm.value.published === true) {
          this._toasterService.displaySnackBar(MessageConstant.successMessage.discountPublishSuccessfully, messageType.success)
        }
        else {
          this._toasterService.displaySnackBar(MessageConstant.successMessage.discountDraftedSuccessfully, messageType.success)
        }
        this._router.navigate(['/discount/list']);
      },
      error: () => {
        this._toasterService.displaySnackBar(MessageConstant.errorMessage.discountCodeAlreadyExist, messageType.error)
      }
    })
  }

  updateDiscount(): void {
    this._discountService.updateDiscount(this.discountId, this.discountForm.value).pipe(take(1)).subscribe({
      next: () => {
        if (this.discountForm.value.published === true) {
          this._toasterService.displaySnackBar(MessageConstant.successMessage.discountPublishSuccessfully, messageType.success)
        }
        else {
          this._toasterService.displaySnackBar(MessageConstant.successMessage.discountDraftedSuccessfully, messageType.success)
        }
        this._router.navigate(['/discount/list']);
      }, error: () => {
        this._toasterService.displaySnackBar(MessageConstant.errorMessage.discountCodeAlreadyExist, messageType.error)
      }
    })
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

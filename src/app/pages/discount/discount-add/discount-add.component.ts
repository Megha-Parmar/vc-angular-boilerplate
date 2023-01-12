import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { CurrencyModel } from 'src/app/core/models/discount.model';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.scss']
})
export class DiscountAddComponent implements OnInit, OnDestroy {

  discountId: string = '';
  discountTypeBy: string = '';
  isViewPage: boolean = false;

  discountType = Constants.DiscountType;
  currencyList!: CurrencyModel[];
  discountForm!: FormGroup;
  discountOn = Constants.DiscountOn;
  currentDate: Date = new Date();
  eventList: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  selectedEvent: any[] = [];
  ckeConfig = Constants.CkEditorConfig

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _toasterService: ToasterService,
  ) {
    console.log('_router', this._router.url)
    if (this._activatedRoute.snapshot.paramMap.get('id')) {
      this.discountId = this._activatedRoute.snapshot.paramMap.get('id') as string;
    }
    if (this._router.url.includes('view')) {
      this.isViewPage = true;
    }
    this.initializeForm();
    if (this.discountId) {
      // this.getDiscountById();
    }
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
      // events: new FormControl([], [Validators.required]),
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

  onChange(event: any): void {
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

  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

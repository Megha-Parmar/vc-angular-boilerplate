import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vc-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VcInputComponent),
      multi: true
    }
  ],
  templateUrl: './vc-input.component.html',
  styleUrls: ['./vc-input.component.scss'],

})
export class VcInputComponent implements ControlValueAccessor {
  @Input() public cssClass: { [key: string]: boolean };
  @Input() public label: string;
  @Input() public type: string;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public options: any = {};
  @Input() public required = false;
  @Input() public isDisabled = false;
  @Input({ required: false }) pattern: RegExp;
  _control = "";

  get control(): string {
    return this._control;
  }

  set control(value: string) {
    this._control = value;
    this.propagateChange(this._control);
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this.control = value;
    }
  }

  propagateChange = (_: any) => { };
  propagateTouched = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

  touched($event) {
    this.propagateTouched($event);
  }
}
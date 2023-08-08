import { NgClass } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Params } from '@angular/router';

@Component({
  selector: 'app-vc-input',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => VcInputComponent),
    multi: true
  }],
  templateUrl: './vc-input.component.html',
  styleUrls: ['./vc-input.component.scss'],
  standalone: true,
  imports: [NgClass, FormsModule],
})
export class VcInputComponent implements ControlValueAccessor {

  @Input() customClass: Params;
  @Input() label: string;
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input({ required: true }) name: string;
  @Input() placeholder = '';
  @Input() required = false;
  @Input() isDisabled = false;
  @Input() pattern: RegExp;

  #controlValue = '';
  #propagateChange: (_param: any) => void;
  #propagateTouched: (_param: any) => void;

  get control(): string {
    return this.#controlValue;
  }
  set control(value: string) {
    this.#controlValue = value;
    this.#propagateChange(this.#controlValue);
  }

  writeValue(value: string): void {
    value && (this.control = value);
  }

  registerOnChange(fn: () => void): void {
    this.#propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.#propagateTouched = fn;
  }

  touched($event): void {
    this.#propagateTouched($event);
  }
}
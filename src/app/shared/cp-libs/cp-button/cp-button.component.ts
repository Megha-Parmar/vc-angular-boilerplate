import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Params } from '@angular/router';
import { CpLoaderComponent } from '@cp-libs/cp-loader/cp-loader.component';

@Component({
  selector: 'app-cp-button',
  standalone: true,
  imports: [NgClass, NgIf, CpLoaderComponent],
  templateUrl: './cp-button.component.html'
})
export class CpButtonComponent {

  @Input() type: 'button' | 'submit' = 'button';
  @Input() class: Params;
  @Input() isDisabled = false;
  @Input() tooltip = '';
  @Input() spin = false;

  @Output() buttonTap = new EventEmitter<void>();

  click(): void {
    this.buttonTap.emit();
  }
}

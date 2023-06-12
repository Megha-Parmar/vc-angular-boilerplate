import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CpLoaderComponent } from '@shared/cp-libs/cp-loader/cp-loader.component';

@Component({
  selector: 'app-cp-button',
  standalone: true,
  imports: [CommonModule, CpLoaderComponent],
  templateUrl: './cp-button.component.html'
})
export class CpButtonComponent {

  @Input() label: string;
  @Input() type = 'button';
  @Input() class: { [key: string]: boolean };
  @Input() isDisabled = false;
  @Input() tooltip?: string;
  @Input() spin = false;
  @Output() buttonTap = new EventEmitter<void>();

  click(): void {
    this.buttonTap.emit();
  }
}

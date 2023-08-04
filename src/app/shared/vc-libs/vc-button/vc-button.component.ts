import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VcLoaderComponent } from '@vc-libs/vc-loader/vc-loader.component';

@Component({
  selector: 'app-vc-button',
  standalone: true,
  imports: [CommonModule, VcLoaderComponent],
  templateUrl: './vc-button.component.html'
})
export class VcButtonComponent {

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

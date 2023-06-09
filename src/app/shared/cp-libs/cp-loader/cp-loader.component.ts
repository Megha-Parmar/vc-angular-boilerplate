import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cp-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cp-loader.component.html'
})
export class CpLoaderComponent {

  @Input() class: { [key: string]: boolean };
}

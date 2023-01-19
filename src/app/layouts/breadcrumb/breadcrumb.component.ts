import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() icon = '';
  @Input() pageText = '';
  @Input() pageURL = '';
  @Input() pageSubText = '';
  @Input() redirectionURL = '';
  @Input() addButtonText = '';
  @Input() publishButtonText = '';
  @Input() formNameControl!: FormGroup;
  @Output() publishEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  onPublishClick(): void {
    this.publishEvent.emit(true);
  }

}

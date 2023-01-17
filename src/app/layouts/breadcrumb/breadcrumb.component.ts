import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-breadcrumb',
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
  @Input() formNameControl!:FormGroup;
  @Output() publishEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  onPublishClick():void{
    this.publishEvent.emit(true);
  }

}

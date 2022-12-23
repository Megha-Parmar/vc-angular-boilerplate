import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventAddRoutingModule } from './event-add-routing.module';
import { EventAddComponent } from './event-add.component';

@NgModule({
  declarations: [EventAddComponent],
  imports: [
    CommonModule,
    EventAddRoutingModule
  ]
})
export class EventAddModule { }

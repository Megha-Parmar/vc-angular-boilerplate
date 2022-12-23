import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventListRoutingModule } from './event-list-routing.module';
import { EventListComponent } from './event-list.component';

@NgModule({
  declarations: [EventListComponent],
  imports: [
    CommonModule,
    EventListRoutingModule
  ]
})
export class EventListModule { }

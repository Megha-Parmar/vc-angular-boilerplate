import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminCoreModule } from 'src/app/core/core.module';
import { EventAddRoutingModule } from './event-add-routing.module';
import { EventAddComponent } from './event-add.component';

@NgModule({
  declarations: [EventAddComponent],
  imports: [
    CommonModule,
    EventAddRoutingModule,
    AdminCoreModule
  ]
})
export class EventAddModule { }

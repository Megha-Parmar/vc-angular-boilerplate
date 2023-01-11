import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminCoreModule } from 'src/app/core/core.module';
import { BreadcrumbModule } from 'src/app/layouts/breadcrumb/breadcrumb.module';
import { EventAddRoutingModule } from './event-add-routing.module';
import { EventAddComponent } from './event-add.component';

@NgModule({
  declarations: [EventAddComponent],
  imports: [
    CommonModule,
    EventAddRoutingModule,
    AdminCoreModule,
    MatIconModule,
    BreadcrumbModule
  ]
})
export class EventAddModule { }

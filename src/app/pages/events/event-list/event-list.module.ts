import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { SharedMaterialTableModule } from './../../../shared/shared-material-table.module';
import { EventListRoutingModule } from './event-list-routing.module';
import { EventListComponent } from './event-list.component';

@NgModule({
  declarations: [EventListComponent],
  imports: [
    CommonModule,
    EventListRoutingModule,
    SharedMaterialTableModule,
    MatInputModule
  ]
})
export class EventListModule { }

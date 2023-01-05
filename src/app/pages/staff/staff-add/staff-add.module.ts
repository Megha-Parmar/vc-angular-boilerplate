import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminCoreModule } from 'src/app/core/core.module';
import { StaffAddRoutingModule } from './staff-add-routing.module';
import { StaffAddComponent } from './staff-add.component';

@NgModule({
  declarations: [StaffAddComponent],
  imports: [
    CommonModule,
    StaffAddRoutingModule,
    AdminCoreModule
  ]
})
export class StaffAddModule { }

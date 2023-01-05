import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdminCoreModule } from 'src/app/core/core.module';
import { StaffAddRoutingModule } from './staff-add-routing.module';
import { StaffAddComponent } from './staff-add.component';

@NgModule({
  declarations: [StaffAddComponent],
  imports: [
    CommonModule,
    StaffAddRoutingModule,
    AdminCoreModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class StaffAddModule { }

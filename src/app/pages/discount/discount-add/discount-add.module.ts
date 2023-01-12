import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminCoreModule } from 'src/app/core/core.module';
import { BreadcrumbModule } from 'src/app/layouts/breadcrumb/breadcrumb.module';
import { DiscountAddRoutingModule } from './discount-add-routing.module';
import { DiscountAddComponent } from './discount-add.component';

@NgModule({
  declarations: [DiscountAddComponent],
  imports: [
    CommonModule,
    DiscountAddRoutingModule,
    AdminCoreModule,
    MatIconModule,
    BreadcrumbModule
  ]
})
export class DiscountAddModule { }

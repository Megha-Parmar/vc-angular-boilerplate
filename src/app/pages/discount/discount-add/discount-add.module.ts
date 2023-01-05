import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminCoreModule } from 'src/app/core/core.module';
import { DiscountAddRoutingModule } from './discount-add-routing.module';
import { DiscountAddComponent } from './discount-add.component';

@NgModule({
  declarations: [DiscountAddComponent],
  imports: [
    CommonModule,
    DiscountAddRoutingModule,
    AdminCoreModule
  ]
})
export class DiscountAddModule { }

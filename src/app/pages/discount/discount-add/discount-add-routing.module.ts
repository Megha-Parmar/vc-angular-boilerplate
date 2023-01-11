import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountAddComponent } from './discount-add.component';

const routes: Routes = [
  { path: '', component: DiscountAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountAddRoutingModule { }

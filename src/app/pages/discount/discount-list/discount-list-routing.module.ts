import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountListComponent } from './discount-list.component';


const routes: Routes = [
  {
    path: '',
    component: DiscountListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountListRoutingModule { }

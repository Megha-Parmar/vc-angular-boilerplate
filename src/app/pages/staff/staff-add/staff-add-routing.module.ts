import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffAddComponent } from './staff-add.component';

const routes: Routes = [
  { path: '', component: StaffAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffAddRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventAddComponent } from './event-add.component';

const routes: Routes = [
  { path: '', component: EventAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventAddRoutingModule { }

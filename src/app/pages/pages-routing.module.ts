import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from 'src/app/pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        title:'Dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'profile',
        title:'Profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      { path: 'event', redirectTo: '/event/list', pathMatch: 'full', },
      {
        path: 'event/list',
        title:'Event List',
        loadChildren: () =>
          import('./event/event-list/event-list.module').then((m) => m.EventListModule),
      },
      {
        path: 'event/add',
        title:'Add Event',
        loadChildren: () =>
          import('./event/event-add/event-add.module').then((m) => m.EventAddModule),
      },
      {
        path: 'event/:id/edit',
        title:'Edit Event',
        loadChildren: () =>
          import('./event/event-add/event-add.module').then((m) => m.EventAddModule),
      },
      { path: 'discount', redirectTo: '/discount/list', pathMatch: 'full', },
      {
        path: 'discount/list',
        title:'Discount List',
        loadChildren: () =>
          import('./discount/discount-list/discount-list.module').then((m) => m.DiscountListModule),
      },
      {
        path: 'discount/add',
        title:'Add Discount',
        loadChildren: () =>
          import('./discount/discount-add/discount-add.module').then((m) => m.DiscountAddModule),
      },
      {
        path: 'discount/:id/edit',
        title:'Edit Discount',
        loadChildren: () =>
          import('./discount/discount-add/discount-add.module').then((m) => m.DiscountAddModule),
      },
      {
        path: 'discount/:id/view',
        title:'View Discount',
        loadChildren: () =>
          import('./discount/discount-add/discount-add.module').then((m) => m.DiscountAddModule),
      },
      { path: 'staff', redirectTo: '/staff/list', pathMatch: 'full', },
      {
        path: 'staff/list',
        title:'Staff List',
        loadChildren: () =>
          import('./staff/staff-list/staff-list.module').then((m) => m.StaffListModule),
      },
      {
        path: 'staff/add',
        title:'Add Staff',
        loadChildren: () =>
          import('./staff/staff-add/staff-add.module').then((m) => m.StaffAddModule),
      },
      {
        path: 'staff/:id/edit',
        title:'Edit Staff',
        loadChildren: () =>
          import('./staff/staff-add/staff-add.module').then((m) => m.StaffAddModule),
      },
      {
        path: 'error',
        loadChildren: () => import('./../error-routes/error-routes.module').then(m => m.ErrorRoutesModule),
        //  component: Error403Component
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

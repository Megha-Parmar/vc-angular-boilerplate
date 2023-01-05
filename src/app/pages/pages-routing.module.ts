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
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      { path: 'event', redirectTo: '/event/list', pathMatch: 'full', },
      {
        path: 'event/list',
        loadChildren: () =>
          import('./event/event-list/event-list.module').then((m) => m.EventListModule),
      },
      {
        path: 'event/add',
        loadChildren: () =>
          import('./event/event-add/event-add.module').then((m) => m.EventAddModule),
      },
      {
        path: 'event/:id/edit',
        loadChildren: () =>
          import('./event/event-add/event-add.module').then((m) => m.EventAddModule),
      },
      { path: 'discount', redirectTo: '/discount/list', pathMatch: 'full', },
      {
        path: 'discount/list',
        loadChildren: () =>
          import('./discount/discount-list/discount-list.module').then((m) => m.DiscountListModule),
      },
      {
        path: 'discount/add',
        loadChildren: () =>
          import('./discount/discount-add/discount-add.module').then((m) => m.DiscountAddModule),
      },
      {
        path: 'discount/:id/edit',
        loadChildren: () =>
          import('./discount/discount-add/discount-add.module').then((m) => m.DiscountAddModule),
      },
      {
        path: 'discount/:id/view',
        loadChildren: () =>
          import('./discount/discount-add/discount-add.module').then((m) => m.DiscountAddModule),
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

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
      {
        path: 'events/list',
        loadChildren: () =>
          import('./events/event-list/event-list.module').then((m) => m.EventListModule),
      },
      {
        path: 'events/add',
        loadChildren: () =>
          import('./events/event-add/event-add.module').then((m) => m.EventAddModule),
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

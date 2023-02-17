import { Routes } from '@angular/router';
import { PagesComponent } from 'src/app/pages/pages.component';

export const pageRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('../../pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
      },
      {
        path: 'sales-report',
        title: 'Sales Report',
        loadComponent: () => import('../../pages/reports/sales-report/sales-report.component').then((m) => m.SalesReportComponent)
      },
      {
        path: 'profile',
        title: 'Profile',
        loadComponent: () => import('../../pages/profile/profile.component').then((m) => m.ProfileComponent)
      },
      { path: 'event', redirectTo: '/event/list', pathMatch: 'full', },
      {
        path: 'event/list',
        title: 'Event List',
        loadComponent: () => import('../../pages/event/event-list/event-list.component').then((m) => m.EventListComponent)
      },
      {
        path: 'event/add',
        title: 'Add Event',
        loadComponent: () => import('../../pages/event/event-add/event-add.component').then((m) => m.EventAddComponent)
      },
      {
        path: 'event/:id/edit',
        title: 'Edit Event',
        loadComponent: () => import('../../pages/event/event-add/event-add.component').then((m) => m.EventAddComponent)
      },
      { path: 'discount', redirectTo: '/discount/list', pathMatch: 'full', },
      {
        path: 'discount/list',
        title: 'Discount List',
        loadComponent: () => import('../../pages/discount/discount-list/discount-list.component').then((m) => m.DiscountListComponent)
      },
      {
        path: 'discount/add',
        title: 'Add Discount',
        loadComponent: () => import('../../pages/discount/discount-add/discount-add.component').then((m) => m.DiscountAddComponent)
      },
      {
        path: 'discount/:id/edit',
        title: 'Edit Discount',
        loadComponent: () => import('../../pages/discount/discount-add/discount-add.component').then((m) => m.DiscountAddComponent)
      },
      {
        path: 'discount/:id/view',
        title: 'View Discount',
        loadComponent: () => import('../../pages/discount/discount-add/discount-add.component').then((m) => m.DiscountAddComponent)
      },
      { path: 'staff', redirectTo: '/staff/list', pathMatch: 'full', },
      {
        path: 'staff/list',
        title: 'Staff List',
        loadComponent: () => import('../../pages/staff/staff-list/staff-list.component').then((m) => m.StaffListComponent)
      },
      {
        path: 'staff/add',
        title: 'Add Staff',
        loadComponent: () => import('../../pages/staff/staff-add/staff-add.component').then((m) => m.StaffAddComponent)
      },
      {
        path: 'staff/:id/edit',
        title: 'Edit Staff',
        loadComponent: () => import('../../pages/staff/staff-add/staff-add.component').then((m) => m.StaffAddComponent)
      },
      {
        path: 'error',
        loadChildren: () => import('../constants/error-routes').then((m) => m.errorRoutes)
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

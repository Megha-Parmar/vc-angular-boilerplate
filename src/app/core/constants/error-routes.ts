import { Routes } from "@angular/router";

export const errorRoutes: Routes = [
  {
    path: 'not-found',
    title: 'Not Found',
    loadComponent: () => import('../../error-routes/not-found/not-found.component').then((m) => m.NotFoundComponent)
  },
  {
    path: 'not-found-internal',
    title: 'Internal Server Error',
    loadComponent: () => import('../../error-routes/not-found-internal/not-found-internal.component').then((m) => m.NotFoundInternalComponent)
  },
  {
    path: 'forbidden',
    title: 'Forbidden',
    loadComponent: () => import('../../error-routes/error403/error403.component').then((m) => m.Error403Component)
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

import { Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { LoginGuardService } from 'src/app/core/guard/login-guard.service';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth-routes').then((m) => m.authRoutes),
    canMatch: [LoginGuardService],
  },
  {
    path: '',
    loadChildren: () => import('./page-routes').then((m) => m.pageRoutes),
    canMatch: [AuthGuardService],
  },
  {
    path: 'error',
    loadChildren: () => import('./error-routes').then((m) => m.errorRoutes)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

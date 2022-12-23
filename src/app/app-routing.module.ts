import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guard/auth-guard.service';
import { LoginGuardService } from './core/guard/login-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canMatch: [LoginGuardService],
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canMatch: [AuthGuardService],
  },
  {
    path: 'error',
    loadChildren: () => import('./error-routes/error-routes.module')
      .then(m => m.ErrorRoutesModule),
    //  component: Error403Component
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

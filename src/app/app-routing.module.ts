import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  //   canMatch: [LoginGuardService],
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  //   canMatch: [AuthGuardService],
  // },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from "@angular/router";

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'pageTitle.login',
    loadComponent: () => import('@auth/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'forgot-password',
    title: 'pageTitle.forgotPassword',
    loadComponent: () => import('@auth/forgot-password/forgot-password.component')
      .then((m) => m.ForgotPasswordComponent)
  },
  {
    path: 'logout',
    title: 'pageTitle.logout',
    loadComponent: () => import('@auth/logout/logout.component')
      .then((m) => m.LogoutComponent)
  }
];
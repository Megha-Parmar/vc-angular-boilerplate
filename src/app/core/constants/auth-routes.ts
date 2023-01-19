import { Routes } from "@angular/router";

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('../../auth/login/login.component').then((m) => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('../../auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
    title: 'Forgot Password'
  },
  {
    path: 'reset-password/:id',
    loadComponent: () => import('../../auth/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
    title: 'Reset Password'
  }
];

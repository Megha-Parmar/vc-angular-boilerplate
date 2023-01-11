import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { AdminCoreModule } from 'src/app/core/core.module';
import { CommonMaterialModule } from '../core/common-material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const authComponent = [
  LoginComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title:'Login'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title:'Forgot Password'
  },
  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent,
    title:'Reset Password'
  }
];

@NgModule({
  declarations: [
    ...authComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminCoreModule,
    MatCardModule,
    CommonMaterialModule
  ],
  providers: [
  ]
})
export class AuthModule { }

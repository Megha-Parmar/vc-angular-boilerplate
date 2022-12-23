import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { AdminCoreModule } from 'src/app/core/core.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';


const authComponent = [
  LoginComponent,
  ForgotPasswordComponent
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
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
    MatInputModule,
    MatIconModule
  ],
  providers: [
  ]
})
export class AuthModule { }

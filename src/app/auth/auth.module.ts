import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { AdminCoreModule } from 'src/app/core/core.module';
import { LoginComponent } from './login/login.component';


const authComponent = [
  LoginComponent,
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
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
  ],
  providers: [
  ]
})
export class AuthModule { }

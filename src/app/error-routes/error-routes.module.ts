import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error403Component } from './error403/error403.component';
import { NotFoundInternalComponent } from './not-found-internal/not-found-internal.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'not-found',
    data: {
      title: 'Not Found View'
    },
    component: NotFoundComponent
  },
  {
    path: 'not-found-internal',
    data: {
      title: 'Error 500 View'
    },
    component: NotFoundInternalComponent
  },
  {
    path: 'error-403',
    data: {
      title: 'Error 403 View'
    },
    component: Error403Component
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    NotFoundComponent,
    NotFoundInternalComponent,
    Error403Component
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class ErrorRoutesModule { }

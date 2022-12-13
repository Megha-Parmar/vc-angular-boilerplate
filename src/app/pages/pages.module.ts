import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// components
import { PagesComponent } from 'src/app/pages/pages.component';

// modules
import { LayoutModule } from 'src/app/layouts/layout.module';
import { PagesRoutingModule } from 'src/app/pages/pages-routing.module';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule
  ]
})
export class PagesModule { }

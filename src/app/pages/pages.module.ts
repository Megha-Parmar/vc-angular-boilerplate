import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminCoreModule } from 'src/app/core/core.module';
import { LayoutModule } from 'src/app/layouts/layout.module';
import { PagesRoutingModule } from 'src/app/pages/pages-routing.module';
import { PagesComponent } from 'src/app/pages/pages.component';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    AdminCoreModule,
  ]
})
export class PagesModule { }

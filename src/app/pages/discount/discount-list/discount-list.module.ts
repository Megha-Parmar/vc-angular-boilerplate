import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdminCoreModule } from 'src/app/core/core.module';
import { BreadcrumbModule } from 'src/app/layouts/breadcrumb/breadcrumb.module';
import { SharedMaterialTableModule } from './../../../shared/shared-material-table.module';
import { DiscountListRoutingModule } from './discount-list-routing.module';
import { DiscountListComponent } from './discount-list.component';

@NgModule({
  declarations: [DiscountListComponent],
  imports: [
    CommonModule,
    DiscountListRoutingModule,
    SharedMaterialTableModule,
    MatInputModule,
    MatIconModule,
    AdminCoreModule,
    BreadcrumbModule
  ]
})


export class DiscountListModule {
  /* make sure DiscountListModule is imported only by the AppModule and noone else */
  constructor(@Optional() @SkipSelf() presentInParent: DiscountListModule) {
    if (presentInParent) {
      throw new Error('PagesModule is already loaded. Import only in AppModule');
    }
  }
}

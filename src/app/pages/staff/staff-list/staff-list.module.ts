import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminCoreModule } from 'src/app/core/core.module';
import { SharedMaterialTableModule } from './../../../shared/shared-material-table.module';
import { StaffListRoutingModule } from './staff-list-routing.module';
import { StaffListComponent } from './staff-list.component';

@NgModule({
  declarations: [StaffListComponent],
  imports: [
    CommonModule,
    StaffListRoutingModule,
    SharedMaterialTableModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    AdminCoreModule
  ]
})


export class StaffListModule {
  /* make sure StaffListModule is imported only by the AppModule and noone else */
  constructor(@Optional() @SkipSelf() presentInParent: StaffListModule) {
    if (presentInParent) {
      throw new Error('StaffListModule is already loaded. Import only in AppModule');
    }
  }
}

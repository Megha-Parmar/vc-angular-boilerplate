import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdminCoreModule } from 'src/app/core/core.module';
import { SharedMaterialTableModule } from './../../../shared/shared-material-table.module';
import { EventListRoutingModule } from './event-list-routing.module';
import { EventListComponent } from './event-list.component';

@NgModule({
  declarations: [EventListComponent],
  imports: [
    CommonModule,
    EventListRoutingModule,
    SharedMaterialTableModule,
    MatInputModule,
    MatIconModule,
    AdminCoreModule
  ]
})


export class EventListModule {
  /* make sure EventListModule is imported only by the AppModule and noone else */
  constructor(@Optional() @SkipSelf() presentInParent: EventListModule) {
    if (presentInParent) {
      throw new Error('PagesModule is already loaded. Import only in AppModule');
    }
  }
}

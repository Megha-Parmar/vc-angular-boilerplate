import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from 'src/app/layouts/layout.module';
import { PagesRoutingModule } from 'src/app/pages/pages-routing.module';
import { PagesComponent } from 'src/app/pages/pages.component';
import { ConfirmationComponent } from '../core/components/confirmation/confirmation.component';
import { PopupOpenService } from '../core/services/popup-open.service';

@NgModule({
  declarations: [
    PagesComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    MatDialogModule
  ],
  providers: [PopupOpenService]
})
export class PagesModule {
  /* make sure CoreModule is imported only by the AppModule and noone else */
  constructor(@Optional() @SkipSelf() presentInParent: PagesModule) {
    if (presentInParent) {
      throw new Error('PagesModule is already loaded. Import only in AppModule');
    }
  }
}

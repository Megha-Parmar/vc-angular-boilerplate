
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
})
export class AdminCoreModule {
  /* make sure CoreModule is imported only by the AppModule and noone else */
  constructor(@Optional() @SkipSelf() presentInParent: AdminCoreModule) {
    if (presentInParent) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

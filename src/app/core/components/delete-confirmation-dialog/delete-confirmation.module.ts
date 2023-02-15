import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

// import { CommonMaterialModule } from 'src/app/core/common-material.module';

import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

@NgModule({
  declarations: [DeleteConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    // CommonMaterialModule
  ],
  exports: [DeleteConfirmationDialogComponent]
})
export class DeleteConfirmationModule { }

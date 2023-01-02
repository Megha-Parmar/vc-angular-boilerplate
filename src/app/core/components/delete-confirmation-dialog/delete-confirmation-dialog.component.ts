import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
        <mat-dialog-content>
        <div class="delete-icon">
          <mat-icon>close</mat-icon>
        </div>
        <div class="text-center">
          <p>
            {{data | translate }}
          </p>
          </div>
        </mat-dialog-content>

        <mat-dialog-actions class="d-flex" align='end'>
        <button class="primary-btn trans" mat-button (click)='onConfirmation()' tabindex='1'>{{ 'categoryPage.yesText' | translate}}</button>
        <button class="secondary-btn trans" mat-button type='button' mat-dialog-close tabindex='-1'>{{ 'categoryPage.noText' | translate}}</button>
        </mat-dialog-actions>`,
  styles: [],
})
export class DeleteConfirmationDialogComponent {

  /**
  * Creates an instance of DeleteConfirmationDialog.
  * @param dialogRef Dialog reference component
  * @param data Dialog data
  */
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  /**
  * Method called when click on yes
  */
  onConfirmation(): void {
    this.dialogRef.close(true);
  }

}

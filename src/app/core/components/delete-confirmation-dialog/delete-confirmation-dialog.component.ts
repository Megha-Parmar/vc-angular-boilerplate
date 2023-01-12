import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
        <mat-dialog-content>
        <!-- <div class="delete-icon">
          <button mat-dialog-close mat-icon-button>
          <mat-icon>{{'iconList.closeIcon' | translate}}</mat-icon>
          </button>
        </div> -->
        <p>{{ data.confirmationText | translate }} <strong>{{ data.details }} </strong> <span *ngIf="data.details">? </span> </p>
        </mat-dialog-content>

        <mat-dialog-actions class="d-flex" align='end'>
        <button class="primary-btn trans" mat-button (click)='onConfirmation()' tabindex='1'>{{ 'dailogData.okText' | translate }}</button>
        <button class="secondary-btn trans" mat-button type='button' mat-dialog-close tabindex='-1'>{{ 'dailogData.cancelText' | translate }}</button>
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

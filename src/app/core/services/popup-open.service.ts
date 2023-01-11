import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable()
export class PopupOpenService {

  constructor(
    private matDialog: MatDialog,
  ) { }

  openPopup(componentName: any, data: object = {}, width: string = '', closeOnNavigation = false, extraParams?: MatDialogConfig<any>) {
    const dialogRef = this.matDialog.open(componentName, {
      autoFocus: false,
      disableClose: true,
      width: width ? width : '500px',
      data: data ? data : '',
      closeOnNavigation: closeOnNavigation,
      scrollStrategy: new NoopScrollStrategy(),
      ...extraParams
    });
    dialogRef.afterClosed().subscribe((response) => {
    });
    return dialogRef;
  }

  closeAllPopup() {
    this.matDialog.closeAll();
  }

  getNumberOfOpenDialog() {
    return this.matDialog.openDialogs.length;
  }

}

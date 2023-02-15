import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogboxComponent } from './../components/common-dialogbox/common-dialogbox.component';
import { ImportDynamicComponentService } from './import-dynamic-component.service';

@Injectable()
export class PopupOpenService {

  constructor(
    private matDialog: MatDialog,
    private importDynamicComponentService: ImportDynamicComponentService
  ) { }

  openPopup(data: object = {}, width: string = '', closeOnNavigation = false, extraParams?: MatDialogConfig<any>) {
    const dialogRef: MatDialogRef<CommonDialogboxComponent, any> = this.matDialog.open(CommonDialogboxComponent, {
      data: {
        loadComponent: this.importDynamicComponentService.importDeleteStaffComp(),
        compData: data ? data : '',
      },
      autoFocus: false,
      disableClose: true,
      width: width ? width : '500px',
      closeOnNavigation: closeOnNavigation,
      scrollStrategy: new NoopScrollStrategy(),
      ...extraParams
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

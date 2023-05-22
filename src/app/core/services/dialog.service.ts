import {Injectable} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CpDialogComponent } from '@app/shared/cp-libs/cp-dialog/cp-dialog.component';
import { ImportDynamicComponentService } from '@services/import-dynamic-component.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private matDialog: MatDialog,
    private importDynamicComponentService: ImportDynamicComponentService,
  ) {}

  openGenerateCodeDialog(data?: any): MatDialogRef<CpDialogComponent, any> {
    const dialogRef: MatDialogRef<CpDialogComponent, any> = this.matDialog.open(CpDialogComponent, {
      data: {
        loadComponent: this.importDynamicComponentService.importGenerateCodeComponent(),
        compData: {
          data
        },
        dialogTitle: 'partner.generateCode.generateCode',
      },
      panelClass: 'cp-generic-dialog-box',
      maxWidth: 'calc(100% - 24px)',
      minHeight: '300px',
      hasBackdrop: true,
      disableClose: true,
    });
    return dialogRef;
  }
}

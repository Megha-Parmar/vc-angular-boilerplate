import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CpDialogComponent } from '@app/shared/cp-libs/cp-dialog/cp-dialog.component';
import { PartnerDetail } from '../models/partner.model';
import { ImportDynamicComponentService } from './import-dynamic-component.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public closeDialogEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private matDialog: MatDialog,
    private importDynamicComponentService: ImportDynamicComponentService,
  ) { }

  openGenerateCodeDialog(data?: PartnerDetail): MatDialogRef<CpDialogComponent, boolean> {
    const dialogRef: MatDialogRef<CpDialogComponent, boolean> = this.matDialog.open(CpDialogComponent, {
      data: {
        loadComponent: this.importDynamicComponentService.importGenerateCodeComponent(),
        data,
        dialogTitle: 'partner.confirmDialog.Title',
      },
      panelClass: 'cp-generic-dialog-box',
      maxWidth: 'calc(100% - 24px)',
      minHeight: '250px',
      hasBackdrop: true,
      disableClose: true,
    });
    return dialogRef;
  }
}

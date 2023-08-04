import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CpDialogComponent } from '@cp-libs/cp-dialog/cp-dialog.component';
import { PartnerDetail } from '@models/partner.model';
import { ImportDynamicComponentService } from '@services/import-dynamic-component.service';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private _closeDialogEvent = new EventEmitter<boolean>();

  constructor(
    private matDialog: MatDialog,
    private importDynamicComponentService: ImportDynamicComponentService,
  ) { }

  openGenerateCodeDialog(data?: PartnerDetail): MatDialogRef<CpDialogComponent, any> {
    const dialogRef: MatDialogRef<CpDialogComponent, any> = this.matDialog.open(CpDialogComponent, {
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

  // Method to subscribe to the private event emitter
  subscribeToEvent(callback: (data: boolean) => void): void {
    this._closeDialogEvent.subscribe(callback);
  }

  // Method to emit events from the service
  emitEvent(data: boolean): void {
    this._closeDialogEvent.emit(data);
  }
}

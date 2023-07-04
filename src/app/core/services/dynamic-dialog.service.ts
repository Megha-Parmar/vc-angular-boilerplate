import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DynamicDialogComponent } from '@cp-libs/dynamic-dialog/dynamic-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  showDialog(component: unknown, componentData: any = {}): MatDialogRef<DynamicDialogComponent, any> {
    return this.dialog.open(DynamicDialogComponent, {
      data: { component, ...componentData }, disableClose: true,
      ...componentData.width && { width: componentData.width }
    });
  }
}

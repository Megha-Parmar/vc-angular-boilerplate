import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title?: string;
  detail?: string;
  highLightedText?: string;
  okText?: string;
  cancelText?: string;
  type?: 'reject-tc' | 'inactivity';
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  notes = '';
  constructor(
    private dailogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public dailogData: DialogData
  ) {
    console.log('dailogData', dailogData);
  }

  ngOnInit(): void { }
  cancel(): void {
    this.dailogRef.close(false);
  }

  ok(): void {
    if (this.dailogData?.type === 'reject-tc') {
      this.dailogRef.close({ proceed: true, notes: this.notes });
    } else {
      this.dailogRef.close(true);
    }
  }
}

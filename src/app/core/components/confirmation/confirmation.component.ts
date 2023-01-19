import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

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
  standalone: true,
  imports:[CommonModule, TranslateModule,MatDialogModule,MatIconModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  notes = '';
  constructor(
    private dailogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public dailogData: DialogData
  ) { }

  ngOnInit(): void { }

  onConfirmation(): void {
    this.dailogRef.close(true);
  }
}

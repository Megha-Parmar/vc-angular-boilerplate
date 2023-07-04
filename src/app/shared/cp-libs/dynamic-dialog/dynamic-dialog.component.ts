import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}

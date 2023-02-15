import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonDialogboxService } from '../../services/common-dialogbox.service';

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
  imports: [CommonModule, TranslateModule, MatDialogModule, MatIconModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})

export class ConfirmationComponent implements OnInit {
  notes = '';

  @Input() compData: any;

  constructor(
    private commonDialogboxService: CommonDialogboxService
  ) { }

  ngOnInit(): void {
    console.log(this.compData);
  }

  onConfirmation(): void {
    this.commonDialogboxService.closeCommonDialogboxEvent.emit(true);
  }
}

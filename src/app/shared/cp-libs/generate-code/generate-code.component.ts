import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RegexType } from '@app/core/constants/app.constants';
import { AllowNumberOnlyDirective } from '@app/core/directives/allow-number-only.directive';
import { DialogService } from '@app/core/services/dialog.service';
import { TranslateModule } from '@ngx-translate/core';
import { CpButtonComponent } from '../cp-button/cp-button.component';


@Component({
  selector: 'app-generate-code',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, CpButtonComponent, TranslateModule,
    FormsModule, ReactiveFormsModule, AllowNumberOnlyDirective],
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.scss']
})
export class GenerateCodeComponent {

  readonly regexType = RegexType;
  isSubmitted = false;
  @Input() data;

  constructor(
    private dialogService: DialogService
  ) { }

  closeDialog(value: boolean): void {
    this.dialogService.closeDialogEvent.emit(value);
  }

  tapOkButton(): void {
    this.closeDialog(true);
  }

}

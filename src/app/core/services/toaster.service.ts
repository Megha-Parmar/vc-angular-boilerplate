import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  duration = 5000;
  currentLang: string = environment.DEFAULT_LANGUAGE;

  constructor(
    private matToaster: MatSnackBar,
    private translateService: TranslateService,
  ) {
    this.languageOnChange();
    // const userData: any = this.authenticationService.currentUserValue;
    const userData: any = 'en';
    if (userData && userData.data && userData.data.language && userData.data.language.shortCode) {
      this.currentLang = userData.data.language.shortCode;
    }
  }

  languageOnChange(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  /**
   * Common snackbar to display toastr messages
   * @param message Message to display
   * @param type Type of toastr
   */
  displaySnackBar(
    message: string,
    type: 'info' | 'error' | 'warning' | 'success',
  ) {
    let msg = this.translateService.translations[this.currentLang][message];
    if (msg === undefined) {
      msg = message;
    }
    this.matToaster.open(msg, 'X', {
      duration: this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [type + '-snackbar'],
    });
  }

  notifySnackbarMsg(
    mainObject: string,
    message: string,
    type: 'info' | 'error' | 'warning' | 'success',
  ) {
    let msg = this.translateService.translations[this.currentLang][mainObject][message];
    if (msg === undefined) {
      msg = message;
    }
    this.displaySnackBar(msg, type);
  }

  success(message: string): void {
    this.matToaster.open(message, 'success', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: this.duration,
    });
  }
  error(message: string): void {
    this.matToaster.open(message, 'error', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: this.duration,
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from './core/constants/app.constants';

import { EncryptDecryptService } from './core/services/encrypt-decrypt.service';
import { LanguageService } from './core/services/language.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'vc-angular-boilerplate';
  selectedLanguage = '';

  constructor(
    private translateService: TranslateService,
    private encryptDecryptService: EncryptDecryptService,
    private languageService: LanguageService,
  ) {
    this.languageService.setLanguage();
  }

  ngOnInit(): void {

  }

  /**
     * Set the language
     *
     * param lang
    */
  setLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.encryptDecryptService.setEncryptedLocalStorage(Constants.storageKeys.selectedLanguage, this.selectedLanguage);
    this.translateService.use(lang);
  }


  ngOnDestroy() {

  }

}

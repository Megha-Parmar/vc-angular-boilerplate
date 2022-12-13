import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { locale as englishLocale } from '../../../assets/i18n/en';
import { locale as spanishLocale } from '../../../assets/i18n/es';
import { Constants } from '../constants/app.constants';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { TranslateLoaderService } from './translate-loader.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  selectedLang: string = '';

  constructor(
    private translateService: TranslateService,
    private translateLoaderService: TranslateLoaderService,
    private encryptDecryptService: EncryptDecryptService,
  ) { }

  setLanguage() {
    // get browser language
    // const language = this.translateService.getBrowserLang();
    this.selectedLang = this.encryptDecryptService.getDecryptedLocalStorage(Constants.storageKeys.selectedLanguage);
    this.translateService.addLangs(['en', 'es']);
    this.translateLoaderService.loadTranslations(englishLocale, spanishLocale);

    if (this.selectedLang) {
      this.translateService.setDefaultLang(this.selectedLang);
      this.translateService.use(this.selectedLang);
    } else {
      this.translateService.setDefaultLang(environment.DEFAULT_LANGUAGE);
      this.translateService.use(environment.DEFAULT_LANGUAGE);
    }
  }
}

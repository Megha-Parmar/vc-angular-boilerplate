import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/core/constants/app.constants';
import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt.service';
import { TranslateLoaderService } from 'src/app/core/services/translate-loader.service';
import { locale as englishLocale } from 'src/assets/i18n/en';
import { locale as spanishLocale } from 'src/assets/i18n/es';
import { environment } from 'src/environments/environment';

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

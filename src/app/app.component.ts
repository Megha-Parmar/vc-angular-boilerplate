import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from './core/constants/app.constants';
import { EncryptDecryptService } from './core/services/encrypt-decrypt.service';
import { LanguageService } from './core/services/language.service';
import { LoaderService } from './core/services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {
  isOpended = false;
  title = 'vc-angular-boilerplate';
  selectedLanguage = '';

  constructor(
    private translateService: TranslateService,
    private encryptDecryptService: EncryptDecryptService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
  ) {
    this.languageService.setLanguage();
  }

  ngOnInit(): void {
    this.loaderService.showHideLoader(true);
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.loaderService.showHideLoader(false);
    }, 800);
  }

  /**
   *
   *
   * @param {string} lang
   * @memberof AppComponent
   */
  setLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.encryptDecryptService.setEncryptedLocalStorage(Constants.storageKeys.selectedLanguage, this.selectedLanguage);
    this.translateService.use(lang);
  }

  ngOnDestroy() { }

}

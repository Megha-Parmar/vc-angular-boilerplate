import { AfterContentInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/core/constants/app.constants';
import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { LoaderComponent } from 'src/app/layouts/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
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
   * @param {string} lang
   * @memberof AppComponent
   */
  setLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.encryptDecryptService.setEncryptedLocalStorage(Constants.storageKeys.selectedLanguage, this.selectedLanguage);
    this.translateService.use(lang);
  }

}

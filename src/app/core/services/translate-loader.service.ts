import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface ILocale {
  lang: string;
  data: {};
}

@Injectable({
  providedIn: 'root',
})
export class TranslateLoaderService {
  constructor(private translate: TranslateService) {}

  public loadTranslations(...args: ILocale[]): void {
    const locales = [...args];
    locales.forEach((locale: ILocale) => {
      this.translate.setTranslation(locale.lang, locale.data, true);
    });
  }
}

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('WINDOW') private window: any
  ) { }

  public getWindow() {
    if (isPlatformBrowser(this.platformId)) {
      return this.window;
    }
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  enableLoader = new Subject<boolean>();

  constructor() { }

  showHideLoader(loaderValue: boolean): void {
    this.enableLoader.next(loaderValue);
  }

}

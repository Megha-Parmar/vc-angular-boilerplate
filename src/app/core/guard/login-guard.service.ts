import { Injectable } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt.service';

@Injectable({ providedIn: 'root' })
export class LoginGuardService implements CanMatch {

  constructor(
    private router: Router,
    private _encryptDecryptService: EncryptDecryptService,
  ) { }

  canMatch(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this._encryptDecryptService.getDecryptedLocalStorage(Constants.storageKeys.currentUser)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

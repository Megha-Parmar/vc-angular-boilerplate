import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, CanMatch {

  constructor(
    private router: Router,
    private _encryptDecryptService: EncryptDecryptService,
    private authenticationService: AuthenticationService,
    private toasterService: ToasterService,
  ) {
  }

  canActivate() {
    if (this._encryptDecryptService.getDecryptedLocalStorage(Constants.storageKeys.currentUser)) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  canMatch(_route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this._encryptDecryptService.getDecryptedLocalStorage(Constants.storageKeys.currentUser)) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}

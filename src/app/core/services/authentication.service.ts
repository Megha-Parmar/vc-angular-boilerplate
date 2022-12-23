import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Constants } from '../constants/app.constants';
import { LoginModel } from '../models/user.model';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { ToasterService } from './toaster.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  readonly loginAPI = Constants.APIRoutes.userLogin;
  readonly forgotPasswordAPI = Constants.APIRoutes.userForgotPassword;

  constructor(
    public _httpClient: HttpClient,
    public _encryptDecryptService: EncryptDecryptService,
    public _toasterService: ToasterService,
  ) {

  }

  loginUser(params: LoginModel) {
    return this._httpClient.post<LoginModel>(this.loginAPI, { params }).pipe(map((user: any) => {
      if (user && user?.data) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return user;
      }
    })
    );
  }

  forgotPassword(params: LoginModel) {
    return this._httpClient.post<LoginModel>(this.forgotPasswordAPI, { params }).pipe(map((user: any) => {
      if (user && user?.data) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return user;
      }
    })
    );
  }

  logoutUser() {
    this._encryptDecryptService.removeEncryptedLocalStorage(Constants.storageKeys.currentUser);
    this._encryptDecryptService.removeEncryptedLocalStorage(Constants.storageKeys.token);
    this._toasterService.notifySnackbarMsg('loginPage', 'loggedOut', 'success');
  }


}

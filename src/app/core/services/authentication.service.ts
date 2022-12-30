import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Constants } from '../constants/app.constants';
import { LoginModel, loginResponse } from '../models/user.model';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { ToasterService } from './toaster.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<loginResponse | any> = new BehaviorSubject<loginResponse | any>({});
  public currentUser$: Observable<loginResponse> | null = null;

  userNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  readonly loginAPI = Constants.APIRoutes.userLogin;
  readonly forgotPasswordAPI = Constants.APIRoutes.userForgotPassword;

  constructor(
    public _httpClient: HttpClient,
    public _encryptDecryptService: EncryptDecryptService,
    public _toasterService: ToasterService,
  ) {
    if (this._encryptDecryptService.getDecryptedLocalStorage(Constants.storageKeys.currentUser)) {
      this.currentUserSubject = new BehaviorSubject<loginResponse>(this._encryptDecryptService.getDecryptedLocalStorage(Constants.storageKeys.currentUser));
      this.currentUser$ = this.currentUserSubject.asObservable();
    }
  }



  public get currentUserValue(): loginResponse {
    return this.currentUserSubject.value;
  }

  loginUser(params: LoginModel) {
    return this._httpClient.post<LoginModel>(this.loginAPI, params).pipe(map((user: any) => {
      if (user && user?.data) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.currentUserSubject.next(user.data.data);
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
    this.currentUserSubject.next('');
    this._toasterService.notifySnackbarMsg('loginPage', 'loggedOut', 'success');
  }


}

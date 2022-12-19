import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Constants } from '../constants/app.constants';
import { LoginModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  loginAPI: string = String(Constants.APIRoutes.userLogin);

  constructor(
    public _httpClient: HttpClient
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


}

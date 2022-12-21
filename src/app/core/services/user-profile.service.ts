import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { APIResponse, CurrentUser } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {

  constructor(public http: HttpClient) { }

  getUserProfile(): Observable<APIResponse<CurrentUser>> {
    return this.http.get<any>(Constants.APIRoutes.getUserProfile);
  }
}

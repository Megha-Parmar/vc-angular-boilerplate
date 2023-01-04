import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants/app.constants';
import { DiscountListModel } from '../models/discount.model';
import { APIResponse } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(public _httpClient: HttpClient) { }

  getDiscountList(): Observable<APIResponse<DiscountListModel[]>> {
    return this._httpClient.get<APIResponse<DiscountListModel[]>>(Constants.APIRoutes.getDiscountList);
  }
}

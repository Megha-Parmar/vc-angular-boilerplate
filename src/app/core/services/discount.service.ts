import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/core/models/general.model';
import { Constants } from '../constants/app.constants';
import { DiscountListModel } from '../models/discount.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(public _httpClient: HttpClient) { }

  getDiscountList(): Observable<APIResponse<DiscountListModel[]>> {
    return this._httpClient.get<APIResponse<DiscountListModel[]>>(Constants.APIRoutes.getDiscountList);
  }

  deleteDiscount(id: string): Observable<any> {
    return this._httpClient.delete(Constants.APIRoutes.deleteDiscount + id + '?discount_uuid=' + id)
  }

  getDiscountById(id: string): Observable<APIResponse<DiscountListModel[]>> {
    return this._httpClient.get<APIResponse<DiscountListModel[]>>(Constants.APIRoutes.getDiscountById + id + '?discount_uuid=' + id);
  }

  addDiscount(param: any): Observable<any> {
    return this._httpClient.post<any>(Constants.APIRoutes.createDiscountApi, param)
  }

  updateDiscount(id: string, param: any): Observable<any> {
    return this._httpClient.put(Constants.APIRoutes.updateDiscountApi + id + '?discount_uuid=' + id, param)
  }
}

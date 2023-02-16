import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Constants } from '../constants/app.constants';
import { APIResponse } from '../models/general.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(public http: HttpClient) { }

  getOrderList(page: number, pageSize: number): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(Constants.APIRoutes.getOrder + 'list' + '?page=' + page + '&size=' + pageSize);
  }
}

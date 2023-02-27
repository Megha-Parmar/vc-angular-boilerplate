import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Constants } from 'src/app/core/constants/app.constants';
import { APIResponse } from 'src/app/core/models/general.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(public http: HttpClient) { }

  getOrderList(page: number, pageSize: number): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(Constants.APIRoutes.getOrder + 'list' + '?page=' + page + '&size=' + pageSize);
  }

  getSalesTiles(): Observable<any> {
    return this.http.get<any>(Constants.APIRoutes.getSalesTiles + '?q=last_90_days');
  }
}

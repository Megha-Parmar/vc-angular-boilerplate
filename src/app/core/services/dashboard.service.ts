import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants/app.constants';
import { APIResponse } from '../models/general.model';
import { BookingModel, TableModel } from '../models/reports.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public http: HttpClient) { }

  getDashboardTilesData(): Observable<any> {
    return this.http.get(Constants.APIRoutes.getDashboardTiles + '?q=all')
  }

  getTodaysBooking(page: number, pageSize: number): Observable<APIResponse<TableModel<BookingModel[]>>> {
    return this.http.get<APIResponse<TableModel<BookingModel[]>>>(Constants.APIRoutes.dashboardTodaysBooking + '?page=' + page + '&size=' + pageSize)
  }

  getEventOnGoingEvents(page: number, pageSize: number): Observable<any> {
    return this.http.get(Constants.APIRoutes.eventOnGoingList + '?page=' + page + '&size=' + pageSize)
  }

  getVisitorGraph(): Observable<any> {
    return this.http.get(Constants.APIRoutes.visitorGraph)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { ListingModel } from 'src/app/core/models/category.model';
import { GraphModel } from 'src/app/core/models/chart.model';
import { EventListModel } from 'src/app/core/models/event.model';
import { APIResponse } from 'src/app/core/models/general.model';
import { BookingUserModel } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(public _httpClient: HttpClient) { }

  getEventList(): Observable<APIResponse<EventListModel[]>> {
    return this._httpClient.get<APIResponse<EventListModel[]>>(
      Constants.APIRoutes.getEventList
    );
  }

  getEventById(id: string): Observable<APIResponse<EventListModel>> {
    return this._httpClient.get<APIResponse<EventListModel>>(
      Constants.APIRoutes.getEventById + id
    );
  }

  deleteEvent(id: string): Observable<APIResponse<EventListModel>> {
    return this._httpClient.delete<APIResponse<EventListModel>>(
      Constants.APIRoutes.deleteEvent + id
    );
  }

  getIsFeaturedSectionInfo(): Observable<any> {
    return this._httpClient.get(Constants.APIRoutes.checkFeaturedImage);
  }

  getAmenitiesList(): Observable<APIResponse<ListingModel[]>> {
    return this._httpClient.get<APIResponse<ListingModel[]>>(
      Constants.APIRoutes.getAmenitiesList
    );
  }

  addEventForm(form: string, formValue: any): Observable<APIResponse<EventListModel>> {
    return this._httpClient.post<APIResponse<EventListModel>>(
      Constants.APIRoutes.createEvent + '?form=' + form, formValue
    );
  }

  updateEvent(id: string, formName: string, param: any): Observable<APIResponse<EventListModel>> {
    return this._httpClient.put<APIResponse<EventListModel>>(Constants.APIRoutes.updateEvent + id + '?event_uuid=' + id + '&form=' + formName, param);
  }

  updateEventStatus(id: string, param: { is_paused: boolean; }): Observable<APIResponse<EventListModel>> {
    return this._httpClient.post<APIResponse<EventListModel>>(Constants.APIRoutes.updateEventStatus + id, param);
  }

  getBookingHistory(pageIndex: number, pageSize: number): Observable<APIResponse<any>> {
    return this._httpClient.get<any>(Constants.APIRoutes.getBookingHistory + '?page=' + pageIndex + '&size=' + pageSize);
  }

  getUserDetails(id: string | null, slot: string | undefined, start_date: string, end_date: string, page: number, pageSize: number): Observable<APIResponse<BookingUserModel>> {
    return this._httpClient.get<APIResponse<BookingUserModel>>
      (Constants.APIRoutes.getUserHistory + id + '?filter=' + slot + '&start_date=' + start_date + '&end_date=' + end_date + '&page=' + page + '&size=' + pageSize);
  }

  getBookingReport(id: string, filter: string | undefined, start_date: string, end_date: string, page: number, size: number): Observable<APIResponse<GraphModel>> {
    return this._httpClient.get<APIResponse<GraphModel>>
      (Constants.APIRoutes.userBookingReport + id + '?event_uuid=' + id + '&filter=' + filter + '&start_date=' + start_date + '&end_date=' + end_date + '&page=' + page + '&size=' + size);
  }

  getEventReportTiles(id: string, filter: string | undefined, start_date: string, end_date: string, page: number, size: number): Observable<any> {
    return this._httpClient.get<any>
      (Constants.APIRoutes.eventReportTiles + id + '?event_uuid=' + id + '&filter=' + filter + '&start_date=' + start_date + '&end_date=' + end_date + '&page=' + page + '&size=' + size);
  }

  getRevenueReport(id: string, filter: string | undefined, start_date: string, end_date: string, page: number, size: number): Observable<APIResponse<GraphModel>> {
    return this._httpClient.get<APIResponse<GraphModel>>
      (Constants.APIRoutes.userRevenueReport + id + '?event_uuid=' + id + '&filter=' + filter + '&start_date=' + start_date + '&end_date=' + end_date + '&page=' + page + '&size=' + size);
  }
}

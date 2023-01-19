import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventListModel } from 'src/app/core/models/event.model';
import { APIResponse } from 'src/app/core/models/general.model';
import { Constants } from '../constants/app.constants';
import { ListingModel } from '../models/category.model';

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

  updateEventStatus(id: string, param: { is_paused: boolean }): Observable<APIResponse<EventListModel>> {
    return this._httpClient.post<APIResponse<EventListModel>>(Constants.APIRoutes.updateEventStatus + id, param);
  }
}

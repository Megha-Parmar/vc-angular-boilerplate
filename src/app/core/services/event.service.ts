import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventListModel } from 'src/app/core/models/event.model';
import { APIResponse } from 'src/app/core/models/general.model';
import { Constants } from '../constants/app.constants';

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

  deleteEvent(id: string): Observable<APIResponse<EventListModel>> {
    return this._httpClient.delete<APIResponse<EventListModel>>(
      Constants.APIRoutes.deleteEvent + id
    );
  }
}

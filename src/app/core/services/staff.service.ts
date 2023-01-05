import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants/app.constants';
import { APIResponse } from '../models/general.model';
import { StaffListModel } from '../models/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(public _httpClient: HttpClient) { }

  getStaffList(): Observable<APIResponse<StaffListModel[]>> {
    return this._httpClient.get<APIResponse<StaffListModel[]>>(Constants.APIRoutes.getStaffList);
  }

  updateStaffStatus(id: string, status: boolean): Observable<APIResponse<StaffListModel>> {
    return this._httpClient.post<APIResponse<StaffListModel>>(Constants.APIRoutes.updateStaffStatus + id + '?staff_uuid=' + id, { "status": status });
  }

}

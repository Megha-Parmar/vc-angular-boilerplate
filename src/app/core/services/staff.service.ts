import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants/app.constants';
import { APIResponse } from '../models/general.model';
import { StaffListModel, StaffModel, StaffRoleModel } from '../models/staff.model';

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

  getRoleList(): Observable<APIResponse<StaffRoleModel[]>> {
    return this._httpClient.get<APIResponse<StaffRoleModel[]>>(Constants.APIRoutes.getRoleList)
  }

  getStaffById(id: string): Observable<APIResponse<StaffModel>> {
    return this._httpClient.get<APIResponse<StaffModel>>(Constants.APIRoutes.getStaffById + id + '?staff_uuid=' + id);
  }

  createStaff(param: StaffModel): Observable<APIResponse<StaffModel>> {
    return this._httpClient.post<APIResponse<StaffModel>>(Constants.APIRoutes.staffCreateApi, param);
  }

  updateStaff(uuid: string, param: StaffModel): Observable<APIResponse<StaffModel>> {
    return this._httpClient.post<APIResponse<StaffModel>>(Constants.APIRoutes.staffUpdateApi + uuid + '?staff_uuid=' + uuid,  param);
  }

}

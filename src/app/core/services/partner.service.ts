import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@constants/app.constants';
import { STORAGE } from '@constants/storage.constant';
import { environment } from '@environment/environment';
import { BreadCrumb } from '@models/breadcrumb.model';
import {
  CardCodeList,
  CreatePartner,
  GenerateCards,
  PartnerList,
  PartnerListQueryParams
} from '@models/partner.model';
import { HttpClientService } from '@services/http-client.service';
import { StorageService } from '@services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  breadcrumbs: BreadCrumb[];
  httpWithoutInterceptor: HttpClient;

  constructor(
    private httpClientService: HttpClientService,
    private httpBackend: HttpBackend,
    private storageService: StorageService
  ) {
    this.httpWithoutInterceptor = new HttpClient(this.httpBackend);
  }

  getPartnerList(params: Partial<PartnerListQueryParams>): Observable<PartnerList> {
    params = { ...params, userId: this.storageService.getUserId() };
    return this.httpClientService.get(API_ROUTES.partnerListApi, { params });
  }

  addPartner(params: Partial<CreatePartner>): Observable<[] | null> {
    return this.httpClientService.post(API_ROUTES.addPartnerApi,
      { ...params, userId: this.storageService.getUserId() });
  }

  getPartnerDetail(uuid: string): Observable<CreatePartner> {
    const token = this.storageService.get(STORAGE.LOGIN_TOKEN);
    const requestUrl = `${environment.hostName}${environment.restAPI}${API_ROUTES.addPartnerApi}/${uuid}`;
    return this.httpWithoutInterceptor.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }) as Observable<CreatePartner>;
  }

  updatePartnerDetail(params: Partial<CreatePartner>, uuid: string): Observable<[] | null> {
    return this.httpClientService.put(`${API_ROUTES.addPartnerApi}/${uuid}`,
      { ...params, userId: this.storageService.getUserId });
  }

  deletePartnerDetail(uuid: string): Observable<[] | null> {
    return this.httpClientService.delete(`${API_ROUTES.addPartnerApi}/${uuid}`);
  }

  getCardCodeList(uuid: string, params: Partial<PartnerListQueryParams>): Observable<CardCodeList> {
    return this.httpClientService.get(`${API_ROUTES.cardListApi}/${uuid}`, { params });
  }

  generateCardCodes(params: Partial<GenerateCards>): Observable<[] | null> {
    return this.httpClientService.post(API_ROUTES.cardListApi, params);
  }

  updateAccountStatus(uuid: string, params: { status: string }): Observable<[] | null> {
    return this.httpClientService.put(`${API_ROUTES.accountStatusChangeApi}/${uuid}`, params);
  }

}

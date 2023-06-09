import { Injectable } from '@angular/core';
import { API_ROUTES } from '@constants/app.constants';
import { BreadCrumb } from '@models/breadcrumb.model';
import {
  CardCodeList,
  CreatePartner,
  GenerateCards,
  PartnerList,
  PartnerListQueryParams
} from '@models/partner.model';
import { HttpClientService } from '@services/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  partnerDetail: CreatePartner;
  breadcrumbs: BreadCrumb[];
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getPartnerList(params: Partial<PartnerListQueryParams>): Observable<PartnerList> {
    return this.httpClientService.get(API_ROUTES.partnerListApi, { params });
  }

  addPartner(params: Partial<CreatePartner>): Observable<[] | null> {
    return this.httpClientService.post(API_ROUTES.addPartnerApi, params);
  }

  getPartnerDetail(uuid: string): Observable<CreatePartner> {
    return this.httpClientService.get(`${API_ROUTES.addPartnerApi}/${uuid}`, {
      headers: {
        'X-CP-BIT': 'false'
      }
    });
  }

  updatePartnerDetail(params: Partial<CreatePartner>, uuid: string): Observable<[] | null> {
    return this.httpClientService.patch(`${API_ROUTES.addPartnerApi}/${uuid}`, params);
  }

  getCardCodeList(uuid: string, params: Partial<PartnerListQueryParams>): Observable<CardCodeList> {
    return this.httpClientService.get(`${API_ROUTES.cardListApi}/${uuid}`, { params });
  }

  generateCardCodes(params: Partial<GenerateCards>): Observable<[] | null> {
    return this.httpClientService.post(API_ROUTES.cardListApi, params);
  }

  updateAccountStatus(uuid: string, params: { status: string }): Observable<[] | null> {
    return this.httpClientService.patch(`${API_ROUTES.accountStatusChangeApi}/${uuid}`, params);
  }

}

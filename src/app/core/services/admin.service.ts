import { Injectable } from '@angular/core';
import { API_ROUTES } from '@constants/app.constants';
import {
  DashboardAccountingStats,
  PerformanceOverview,
  PerformanceStatsParams,
  RedemptionList,
  TopPartners
} from '@models/admin.model';
import { PartnerListQueryParams } from '@models/partner.model';
import { HttpClientService } from '@services/http-client.service';
import { Observable, of } from 'rxjs';
import {
  MockAccountingStats, MockOpenInvoiceList, MockPerformanceOverview, MockRedemptionList,
  MockTopPartnerDetail
} from '../constants/mock-data.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  getDashboardAccountingStats(): Observable<DashboardAccountingStats> {
    // return this.httpClientService.get(API_ROUTES.dashboardAccountingStatsApi);
    return of(MockAccountingStats.data);
  }

  getDashboardPerformanceStats(params: PerformanceStatsParams): Observable<PerformanceOverview[]> {
    // return this.httpClientService.get(API_ROUTES.dashboardPerformanceOverviewApi, { params });
    return of(MockPerformanceOverview.data);

  }

  getTopPartners(): Observable<TopPartners[]> {
    // return this.httpClientService.get(API_ROUTES.dashboardTopPartnersApi);
    return of(MockTopPartnerDetail.data);

  }

  getLatestRedemptionList(params: Partial<PartnerListQueryParams>): Observable<RedemptionList> {
    // return this.httpClientService.get(API_ROUTES.redemptionListApi, { params });
    return of(MockRedemptionList.data);

  }

  getExchangeRate(): Observable<number> {
    return this.httpClientService.get(API_ROUTES.exchangeRateApi);
  }

  saveExchangeRate(params: { exchangeRate: number }): Observable<[] | null> {
    return this.httpClientService.patch(API_ROUTES.exchangeRateApi, params);
  }

  getOpenInvoiceList(params: Partial<PartnerListQueryParams>): Observable<any> {
    // return this.httpClientService.get(API_ROUTES.openInvoiceListApi, { params });
    return of(MockOpenInvoiceList.data);

  }
}

import { Injectable } from '@angular/core';
import {
  MockAccountingStats,
  MockOpenInvoiceList, MockPerformanceOverview, MockRedemptionList,
  MockTopPartnerDetail
} from '@constants/mock-data.constants';
import {
  DashboardAccountingStats,
  InvoiceList,
  PerformanceOverview,
  PerformanceStatsParams,
  RedemptionList,
  TopPartners
} from '@models/admin.model';
import { PartnerListQueryParams } from '@models/partner.model';
import { ApiConfigService } from '@services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getDashboardAccountingStats(): Observable<DashboardAccountingStats> {
    /*
    //use this statement when API_SERVICE_CONFIG is 'real'
        return this.apiConfigService.checkConfig(RealAccountingStats);
    */
    return this.apiConfigService.checkConfig(MockAccountingStats.data);
  }

  getDashboardPerformanceStats(params: PerformanceStatsParams): Observable<PerformanceOverview[]> {
    return this.apiConfigService.checkConfig(MockPerformanceOverview.data, params);
  }

  getTopPartners(): Observable<TopPartners[]> {
    return this.apiConfigService.checkConfig(MockTopPartnerDetail.data);
  }

  getLatestRedemptionList(params: Partial<PartnerListQueryParams>): Observable<RedemptionList> {
    return this.apiConfigService.checkConfig(MockRedemptionList.data, params);
  }

  getOpenInvoiceList(params: Partial<PartnerListQueryParams>): Observable<InvoiceList> {
    return this.apiConfigService.checkConfig(MockOpenInvoiceList.data, params);
  }
}
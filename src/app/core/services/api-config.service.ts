import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { API_SERVICE_CONFIG } from '@services/api-token.service';
import { HttpClientService } from '@services/http-client.service';
import { MockApiService } from '@services/mock-api.service';

@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {
    apiConfig: string;
    constructor(
        private injector: Injector,
        private httpClient: HttpClient
    ) {
        this.apiConfig = this.injector.get(API_SERVICE_CONFIG);
    }

    checkConfig(data: any, option?: any) {
        if (this.apiConfig === 'mock') {
            return new MockApiService().getData(data);
        } else {
            return new HttpClientService(this.httpClient).get(data.url, option);
        }
    }
}
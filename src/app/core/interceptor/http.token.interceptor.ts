import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt.service';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  webToken: string = '';
  reqUrl: string = '';

  constructor(private encryptDecryptService: EncryptDecryptService,
    private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<void>> {
    if (this.encryptDecryptService.getDecryptedLocalStorage(Constants.storageKeys.token)) {
      this.webToken = this.encryptDecryptService.getDecryptedLocalStorage(Constants.storageKeys.token);
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + this.webToken,
        }
      });
    }
    this.reqUrl = environment.contentful.API_URL + req.url;
    req = req.clone({
      url: this.reqUrl,
    });
    this.loaderService.showHideLoader(true);
    return next.handle(req).pipe(
      finalize(()=>{
        this.loaderService.showHideLoader(false);
      })
    )
  }
}

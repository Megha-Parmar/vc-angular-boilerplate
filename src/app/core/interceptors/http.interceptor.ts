import {
  HttpErrorResponse,
  HttpEvent, HttpInterceptorFn,
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageType } from '@constants/app.constants';
import { STORAGE } from '@constants/storage.constant';
import { environment } from '@environment/environment';
import { AlertToastrService } from '@services/alert-toastr.service';
import { LoggerService } from '@services/logger.service';
import { StorageService } from '@services/storage.service';
import { catchError, map } from 'rxjs';

export const HttpTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const storageService = inject(StorageService);
  const token = storageService.get(STORAGE.LOGIN_TOKEN);
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: token,
      }
    });
  }

  if (request.url.includes('images')) {
    const requestUrl = `${environment.baseUrl}${request.url}`;
    request = request.clone({
      url: requestUrl,
    });
  }
  else if (!request.url.includes('i18n')) {
    const requestUrl = `${environment.hostName}${environment.restAPI}${request.url}`;
    request = request.clone({
      url: requestUrl,
    });
  }

  return next(request).pipe(map((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      return event.clone({
        body: event.body.data
      });
    }
    return event;
  }));
};

export const HttpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const toasterService = inject(AlertToastrService);
  const router = inject(Router);

  return next(request).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === HttpStatusCode.Unauthorized) {
      router.navigate(['/auth/logout']);
    }
    if (error.error?.message) {
      toasterService.displaySnackBarWithoutTranslation(error.error.message, MessageType.error);
    }
    const err = new HttpErrorResponse({
      error: error.error,
      statusText: error.message,
      status: error.status
    });
    LoggerService.error(err);
    throw err;
  }));
};
import {
  HttpErrorResponse,
  HttpEvent, HttpInterceptorFn,
  HttpResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorCode, HttpMethod, MessageType } from '@constants/app.constants';
import { STORAGE } from '@constants/localstorage.constant';
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

  if (!request.url.includes('i18n')) {
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
    let errorToastInInterceptor = true;

    if (
      request.method === HttpMethod.get &&
      request.headers?.get('X-CP-BIT') != null &&
      request.headers?.get('X-CP-BIT') === 'false'
    ) {
      errorToastInInterceptor = false;
    }

    if (request.url.includes('/auth/login')) {
      switch (error.error.status) {
        case ErrorCode.unauthorized:
          toasterService.displaySnackBarWithTranslation('toasterMessage.loginUnsuccessful', MessageType.error);
          break;
        case ErrorCode.notFound:
          toasterService.displaySnackBarWithTranslation('toasterMessage.userNotFound', MessageType.error);
          break;
        case ErrorCode.internalServer:
          toasterService.displaySnackBarWithTranslation('toasterMessage.internalServerError', MessageType.error);
          break;
      }
    } else if (error.error.status === ErrorCode.unauthorized) {
      toasterService.displaySnackBarWithTranslation('toasterMessage.tokenExpired', MessageType.error);
      router.navigate(['/auth/logout']);
    } else if (request.url.includes('forgotPassword')) {
      toasterService.displaySnackBarWithTranslation('toasterMessage.forgotPasswordSuccessful', MessageType.success);
      router.navigate(['/auth/login']);
    } else if (errorToastInInterceptor) {
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
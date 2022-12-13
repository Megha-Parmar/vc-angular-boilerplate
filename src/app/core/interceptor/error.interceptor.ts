import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toaster: ToasterService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        console.log('This is client side error');
        errorMsg = `Error: ${error.error.message}`;
      } else {
        // server-side error
        if (error.status === 0) {
          this.toaster.notifySnackbarMsg('generalError', 'UnhandledException', 'error');
        } else if (error.status === 400) {
          this.is400Page();
        } else if (error.status === 401) {
          this.is401Page();
        } else if (error.status === 402) {
          this.is402Page();
        } else if (error.status === 403) {
          this.is403Page();
        } else if (error.status === 404) {
          this.is404Page();
        } else if (error.status === 422) {
          this.is422Page();
        } else if (error.status === 429) {
          this.is429Page();
        } else if (error.status === 500) {
          this.is500Page();
        } else if (error?.url?.includes('/logout') && error?.status === 200 && error?.statusText === 'OK') {
          this.toaster.notifySnackbarMsg('loginForm', 'loggedOut', 'success');
        } else {
          errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
          // this.toaster.displaySnackBar(errorMessage, 'error');
          this.toaster.notifySnackbarMsg('generalError', 'serviceUnavailable', 'error');
        }
      }
      console.log(errorMsg);
      throw new Error(errorMsg);
    })
    )
  }

  is400Page() {
    this.toaster.notifySnackbarMsg('generalError', 'badRequest', 'error');
  }

  is401Page(): void {
    this.toaster.notifySnackbarMsg('generalError', 'unAuthorized', 'error');
  }

  is402Page(): void {
    this.toaster.notifySnackbarMsg('generalError', 'paymentRequired', 'error');

  }

  is403Page() {
    this.toaster.notifySnackbarMsg('generalError', 'forbidden403', 'error');
  }

  is404Page() {
    this.toaster.notifySnackbarMsg('loginForm', 'credentialValid', 'error');
  }

  is422Page() {
    this.toaster.notifySnackbarMsg('generalError', 'unprocessableEntity', 'error');
  }

  is429Page() {
    this.toaster.notifySnackbarMsg('generalError', 'tooManyRequest', 'error');
  }

  is500Page() {
    this.router.navigate(['/error/not-found-internal']);
  }

}

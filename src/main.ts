import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/core/constants/app-routes';
import { ErrorInterceptor } from './app/core/interceptor/error.interceptor';
import { HttpTokenInterceptor } from './app/core/interceptor/http.token.interceptor';

bootstrapApplication(AppComponent,
  {
    providers: [
      importProvidersFrom([RouterModule.forRoot(appRoutes)],
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        MatSnackBarModule,
      ),
      { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
      { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage },
      { provide: 'WINDOW', useFactory: getWindow },
    ],
  }).catch(err => console.log(err));


export function getLocalStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

export function getSessionStorage() {
  return typeof window !== 'undefined' ? window.sessionStorage : null;
}

export function getWindow() {
  return typeof window !== 'undefined' ? window : null;
}

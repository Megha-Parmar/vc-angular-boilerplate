import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { HttpTokenInterceptor } from './core/interceptor/http.token.interceptor';
import { LoaderComponent } from './layouts/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage },
    { provide: 'WINDOW', useFactory: getWindow },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLocalStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

export function getSessionStorage() {
  return typeof window !== 'undefined' ? window.sessionStorage : null;
}

export function getWindow() {
  return typeof window !== 'undefined' ? window : null;
}

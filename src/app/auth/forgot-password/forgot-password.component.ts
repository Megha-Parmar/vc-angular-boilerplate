import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  submitted: boolean = false;
  passwordToggle = true;

  readonly CDN_URL = environment.contentful.CDN_URL;
  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    public router: Router,
    private _authenticationService: AuthenticationService,
    private _toasterService: ToasterService,
    private _loaderService: LoaderService,
    private _encryptDecryptService: EncryptDecryptService,
  ) { }

  ngOnInit(): void {

  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.submitted = true;
    this._loaderService.showHideLoader(true);
    const params = {
      email: form.value?.email,
      password: form.value.password,
    };
    console.log('params', params);
    this._authenticationService.loginUser(params).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          console.log('resp)', resp);
          this._toasterService.notifySnackbarMsg('loginPage', 'loggedIn', 'success');
          this.router.navigate(['/dashboard']);
        }
        this._loaderService.showHideLoader(false);
        this.submitted = false;
      },
      error: () => {
        this._loaderService.showHideLoader(false);
        this.submitted = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

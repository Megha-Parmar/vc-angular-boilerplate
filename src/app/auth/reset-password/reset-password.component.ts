import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  submitted: boolean = false;
  passwordToggle = true;
  confirmpasswordToggle = true;

  readonly CDN_URL = environment.contentful.CDN_URL;
  readonly passwordMinLenght: number = Constants.generalConstant.passwordMinLength;
  readonly passwordMaxLenght: number = Constants.generalConstant.passwordMaxLength;

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    public router: Router,
    private _authenticationService: AuthenticationService,
    private _toasterService: ToasterService,
    private _loaderService: LoaderService,
    private _encryptDecryptService: EncryptDecryptService,
  ) { }

  ngOnInit(): void { }

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
    this._authenticationService.loginUser(params).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (resp) => {
        if (resp && resp.data) {
          this._encryptDecryptService.setEncryptedLocalStorage(Constants.storageKeys.currentUser, resp.data);
          this._encryptDecryptService.setEncryptedLocalStorage(Constants.storageKeys.token, resp.data.token);
          this._toasterService.notifySnackbarMsg('loginPage.loggedIn', 'success');
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

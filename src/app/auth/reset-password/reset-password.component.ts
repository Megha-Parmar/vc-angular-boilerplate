import { NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, TranslateModule, MatIconModule, MatInputModule, RouterModule, MatFormFieldModule],
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
    private _encryptDecryptService: EncryptDecryptService,
  ) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.submitted = true;
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
        this.submitted = false;
      },
      error: () => {
        this.submitted = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}

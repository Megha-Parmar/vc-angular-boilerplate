import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_CONSTANTS, MessageType } from '@constants/app.constants';
import { STORAGE } from '@constants/storage.constant';
import { CpButtonComponent } from '@cp-libs/cp-button/cp-button.component';
import { LoginResponse } from '@models/auth.model';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';
import { AuthenticationService } from '@services/authentication.service';
import { StorageService } from '@services/storage.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CpButtonComponent, TranslateModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  isSubmitted = false;
  readonly supportEmail = APP_CONSTANTS.SUPPORT_EMAIL;
  private destroyRef = inject(DestroyRef);

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toasterService: AlertToastrService,
    private utilityService: UtilityService
  ) { }

  onSubmit(loginForm: NgForm): boolean | void {
    if (loginForm.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.authenticationService.login(loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: LoginResponse) => {
          if (res) {
            this.isSubmitted = false;
            this.storageService.set(STORAGE.LOGIN_TOKEN, res.token);
            this.storageService.set(STORAGE.USER_ROLE, res.role);
            this.storageService.set(STORAGE.USER_DATA, res);
            this.utilityService.changeLanguage(res.locale);

            this.router.navigate(['/admin']).then(() => {
              this.toasterService.displaySnackBarWithTranslation(
                'toasterMessage.loggedInSuccessfully', MessageType.success
              );
            });
          }
        },
        error: () => {
          this.isSubmitted = false;
        }
      });
  }

  navigateToForgotPassword() {
    !this.isSubmitted && this.router.navigate(['/auth/forgot-password']);
  }
}

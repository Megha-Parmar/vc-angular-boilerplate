import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageType, REGEX_CONSTANTS } from '@app/core/constants/app.constants';
import { AlertToastrService } from '@app/core/services/alert-toastr.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { CpButtonComponent } from '@app/shared/cp-libs/cp-button/cp-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, CpButtonComponent, RouterModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {

  isSubmitted = false;
  readonly passwordRegex = REGEX_CONSTANTS.PASSWORD_REGEX;
  private destroyRef = inject(DestroyRef);

  @Input() token!: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toasterService: AlertToastrService
  ) { }

  click(form: NgForm): boolean | void {
    if (form.invalid || (form.value.password !== form.value.confirmPassword)) {
      return true;
    }
    this.isSubmitted = true;
    const payload = {
      id: this.token.replace(/ /g, '+'), // It' replace '+' to '' sign in url
      password: form.value.password
    };
    this.authenticationService.setPassword(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitted = false;
          this.toasterService.displaySnackBarWithTranslation(
            'toasterMessage.setPasswordSuccessful'
            , MessageType.success);
          this.router.navigate(['/auth/logout']);
        },
        error: () => {
          this.isSubmitted = false;
        }
      });
  }
}

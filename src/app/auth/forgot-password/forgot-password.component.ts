import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageType, REGEX_CONSTANTS } from '@constants/app.constants';
import { CpButtonComponent } from '@cp-libs/cp-button/cp-button.component';
import { VcInputComponent } from '@cp-libs/vc-input/vc-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';
import { AuthenticationService } from '@services/authentication.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, TranslateModule, CpButtonComponent, FormsModule, VcInputComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  isSubmitted = false;
  public fpForm: FormGroup;
  readonly emailRegex = REGEX_CONSTANTS.EMAIL_REGEX;
  readonly passwordRegex = REGEX_CONSTANTS.PASSWORD_REGEX;
  private destroyRef = inject(DestroyRef);
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toasterService: AlertToastrService
  ) {
    this.fpForm = this.fb.group({
      email: ['']
    });
  }

  get formControls() {
    return this.fpForm.controls;
  }

  submitForm(): boolean | void {
    this.fpForm.markAllAsTouched();
    if (this.fpForm.invalid) {
      return true;
    }

    this.isSubmitted = true;
    this.authenticationService.forgotPassword(this.fpForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isSubmitted = false))
      .subscribe(() => {
        this.toasterService.displaySnackBarWithTranslation(
          'toasterMessage.forgotPasswordSuccessful', MessageType.success
        );
        this.router.navigate(['/auth/login']);
      });
  }

  backToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}

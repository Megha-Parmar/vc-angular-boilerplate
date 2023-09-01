import { CommonModule } from '@angular/common';
import { ApplicationRef, Component, DestroyRef, ElementRef, ViewContainerRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_CONSTANTS, MessageType } from '@constants/app.constants';
import { STORAGE } from '@constants/storage.constant';
import { LoginResponse } from '@models/auth.model';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';
import { AuthenticationService } from '@services/authentication.service';
import { StorageService } from '@services/storage.service';
import { UtilityService } from '@services/utility.service';
// import { VcButtonComponent } from '@vc-libs/vc-button/vc-button.component';
// import { VcInputComponent } from '@vc-libs/vc-input/vc-input.component';
import {
  HorizontalPosition, SnackbarStyleConfig, VcButtonComponent, VcInputComponent,
  VcSnackbarService, VerticalPosition
} from 'ng-utility-library';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, VcButtonComponent, VcInputComponent, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.scss"],
  providers: [VcSnackbarService]
})
export class LoginComponent {

  isSubmitted = false;
  readonly supportEmail = APP_CONSTANTS.SUPPORT_EMAIL;
  private destroyRef = inject(DestroyRef);
  // data = [
  //   { name: 'John Doe', email: 'john@example.com', age: 28 },
  //   { name: 'Jane Smith', email: 'jane@example.com', age: 32 },
  //   { name: 'Bob Johnson', email: 'bob@example.com', age: 45 },
  //   // Sample data
  // ];
  // page = 1;
  // pageSize = 1;
  // tableHeader = ["Name", "Email", "number"];
  constructor(
    private storageService: StorageService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toasterService: AlertToastrService,
    private utilityService: UtilityService,
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef,
    private el: ElementRef,
    private snackbar: VcSnackbarService,

  ) {
    this.snackbar.setRootViewContainerRef(this.viewContainerRef, this.el);
  }


  // constructor(
  //   private viewContainerRef: ViewContainerRef,
  //   private appRef: ApplicationRef,
  //   private el: ElementRef,
  // ) {
  //   this.service.setRootViewContainerRef(this.viewContainerRef, this.appRef, this.el)
  // }

  onSubmit(loginForm: NgForm): boolean | void {
    if (loginForm.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.authenticationService.login(loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isSubmitted = false))
      .subscribe((res: LoginResponse) => {
        if (res) {
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
      });
  }

  navigateToForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }

  showSnackbar() {

    const message = 'This is a custom snackbar';

    const action = 'Dismiss';

    const duration = 500000;

    const horizontalPosition: HorizontalPosition = 'center';

    const verticalPosition: VerticalPosition = 'top';
    // const isActionIcon = true;
    // const buttonClass = { 'cursor-pointer text-[13px]': true };



    const isActionIcon = false;

    // const buttonClass = { 'common-btn primary-btn font-base font-semibold rounded-[5px] min-w-[120px]': true };



    const styleConfig: SnackbarStyleConfig = {

      width: '900px',

      backgroundColor: "lightblue",

      color: 'chocolate'

    };

    /** pass custom message in snackbar */

    // const obj = { message }

    /** pass custom message,action in snackbar */

    // const obj = { message, action }

    /** pass custom message,action,duration in snackbar */

    // const obj = { message, action, duration }

    /** pass custom message,action,duration,horizontalPosition in snackbar */

    // const obj = { message, action, duration, horizontalPosition }

    /** pass custom message,action,duration,horizontalPosition,verticalPosition in snackbar */

    // const obj = { message, action, duration, horizontalPosition, verticalPosition }

    /** pass custom message,action,duration,horizontalPosition,verticalPosition,styleConfig in snackbar */

    const obj = { message, action, horizontalPosition, verticalPosition, isActionIcon };

    this.snackbar.showSnackbar(obj);

  }
}

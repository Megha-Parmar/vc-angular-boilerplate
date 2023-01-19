import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, MatInputModule, RouterModule, MatFormFieldModule],
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
    this._authenticationService.forgotPassword(params).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          this._toasterService.notifySnackbarMsg('forgotPasswordPage.mailSentText', 'success');
          this.router.navigate(['/login']);
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

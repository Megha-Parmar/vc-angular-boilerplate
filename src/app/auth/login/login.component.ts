import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup | undefined;
  submitted: boolean = false;
  loading: boolean = false;
  passwordToggle = true;
  readonly CDN_URL = environment.contentful.CDN_URL;
  public passwordFieldInputType = 'password';

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    public router: Router,
    private authenticationService: AuthenticationService,
    public formBuilder: FormBuilder,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(Constants.generalConstant.passwordMinLenght),
        Validators.maxLength(Constants.generalConstant.passwordMaxLenght)
      ]),
    });
  }

  get getForm() {
    return this.loginForm?.controls;
  }

  loginUser() {
    this.submitted = true;
    if (this.loginForm?.invalid) {
      return;
    } // stop here if form is invalid
    // this.loading = true;
    const params = {
      email: this.loginForm?.controls['email'].value,
      password: this.loginForm?.controls['password'].value,
    };

  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}

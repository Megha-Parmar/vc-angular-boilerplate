import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent implements OnInit, OnDestroy {

  staffId: string = '';

  submitted: boolean = false;
  readonly CDN_URL = environment.contentful.CDN_URL;

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    public _router: Router,
    private _authenticationService: AuthenticationService,
    private _toasterService: ToasterService,
    private _loaderService: LoaderService,
    private _encryptDecryptService: EncryptDecryptService,
  ) {
    if (this._activatedRoute.snapshot.paramMap.get('id')) {
      this.staffId = this._activatedRoute.snapshot.paramMap.get('id') as string;
    }
  }

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
      password: '',
    };
    this._authenticationService.loginUser(params).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          this._encryptDecryptService.setEncryptedLocalStorage(Constants.storageKeys.currentUser, resp.data.data);
          this._encryptDecryptService.setEncryptedLocalStorage(Constants.storageKeys.token, resp.data.access_token);
          this._toasterService.notifySnackbarMsg('loginPage', 'loggedIn', 'success');
          this._router.navigate(['/dashboard']);
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


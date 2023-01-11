import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { APIResponse } from 'src/app/core/models/general.model';
import { StaffRoleModel } from 'src/app/core/models/staff.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StaffService } from 'src/app/core/services/staff.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';
import { StaffModel } from './../../../core/models/staff.model';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent implements OnInit, OnDestroy {

  staffId: string = '';
  selectedRole: string = '';

  submitted: boolean = false;
  readonly CDN_URL = environment.contentful.CDN_URL;
  staffRoleList!: StaffRoleModel[];
  staffAddEditForm!: StaffModel;
  staffAddEditDetails!: StaffModel;

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    public _router: Router,
    private _authenticationService: AuthenticationService,
    private _toasterService: ToasterService,
    private _loaderService: LoaderService,
    private _encryptDecryptService: EncryptDecryptService,
    private _staffService: StaffService,
  ) {
    if (this._activatedRoute.snapshot.paramMap.get('id')) {
      this.staffId = this._activatedRoute.snapshot.paramMap.get('id') as string;
    }
  }

  ngOnInit(): void {
    this.staffAddEditDetails = {
      name: '',
      email: '',
      role: '',
    };
    this.getRoleList();
    if (this.staffId) {
      this.getStaffById();
    }
  }

  getStaffById(): void {
    this._staffService.getStaffById(this.staffId).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (res: APIResponse<StaffModel>) => {
        if (res && res.data) {
          console.log('test' , res.data)
          let client_uuid = '';
          if(res.data?.client_uuid){
            client_uuid = res.data?.client_uuid;
          }
          this.staffAddEditDetails = {
            name: res.data?.name,
            email: res.data?.email,
            role: client_uuid
          }
          console.log('staffAddEditDetails' , this.staffAddEditDetails)
        }
      }
    })
  }

  getRoleList(): void {
    this._staffService.getRoleList().pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (result: APIResponse<StaffRoleModel[]>) => {
        if (result && result.data) {
          this.staffRoleList = result.data;
        }
        this._loaderService.showHideLoader(false);
      }, error: () => {
        this._loaderService.showHideLoader(false);
      },
    });
  }

  trackByMethod(index: number, el: any): number {
    return el.id || index;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.submitted = true;
    this._loaderService.showHideLoader(true);
    let params = {
      name: form.value?.name,
      email: form.value?.email,
      role: form.value?.role,
    };
    if (this.staffId) {
      // params.uuid = this.staffId;
    }
    console.log('params', params)
    this._staffService.createUpdateStaff(this.staffId, params).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          // this._encryptDecryptService.setEncryptedLocalStorage(Constants.storageKeys.currentUser, resp.data.data);
          // this._encryptDecryptService.setEncryptedLocalStorage(Constants.storageKeys.token, resp.data.access_token);
          // this._toasterService.notifySnackbarMsg('loginPage.loggedIn', 'success');
          // this._router.navigate(['/dashboard']);
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


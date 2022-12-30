import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { loginResponse } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  adminProfile: loginResponse | undefined;

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _authenticationService: AuthenticationService,
    public _router: Router,
    private _toasterService: ToasterService,
    private _userProfileService: UserProfileService,
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.adminProfile = this._authenticationService.currentUserValue;
  }

  goToLogout(): void {
    this._authenticationService.logoutUser();
    this._router.navigate(['/auth/login']);
  }



}

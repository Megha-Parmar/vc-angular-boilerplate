import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CurrentUser } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  adminProfile: CurrentUser | undefined;

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
    this._userProfileService.getUserProfile().pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (result) => {
        if (result && result?.data) {
          this.adminProfile = result?.data;
          console.log('this.adminProfile' , this.adminProfile)
        }
      }
    });
  }

  goToLogout(): void {
    this._authenticationService.logoutUser();
    this._router.navigate(['/auth/login']);
  }



}

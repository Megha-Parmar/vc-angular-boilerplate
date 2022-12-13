import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MessageConstant, messageType } from 'src/app/core/constants/app.constants';
import { CurrentUser } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly baseUrl = environment.BASE_URL;
  readonly CDN_URL = environment.CDN_URL;

  private unSubscriber: Subject<void> = new Subject<void>();

  profileImage: File | string;
  userName: string;
  adminProfile: CurrentUser;

  constructor(
    private authenticationService: AuthenticationService,
    public router: Router,
    private toasterService: ToasterService,
    private userProfileService: UserProfileService,
  ) { }

  ngOnInit(): void {
    this.getUserProfile();

    this.userProfileService.userProfileSubject.subscribe({
      next: (resp) => {
        this.profileImage = resp;
      }
    });
    this.userProfileService.userNameSubject.subscribe({
      next: (resp) => {
        this.userName = resp;
      }
    });
  }

  goToLogout(): void {
    this.authenticationService.logoutUser();
    this.toasterService.displaySnackBar(MessageConstant.successMessage.userLoggedOut, messageType.success);
    this.router.navigate(['/auth/login']);
  }

  goToChangePassword(): void {
    this.router.navigate(['/change-password']);
  }

  goToUserProfile(): void {
    this.router.navigate(['/profile']);
  }

  getUserProfile(): void {
    this.userProfileService
      .getUserProfile()
      .pipe(takeUntil(this.unSubscriber))
      .subscribe({
        next: (result) => {
          if (result && result?.data) {
            this.adminProfile = result?.data;
            this.userProfileService.userProfileSubject.next(this.adminProfile?.profilePicUrl);
            this.userProfileService.userNameSubject.next(this.adminProfile?.userName);
            this.authenticationService.fotowareDamURLSubject.next(this.adminProfile?.fotowareDam?.fotowareDamURL);
          }
        }
      });
  }

}

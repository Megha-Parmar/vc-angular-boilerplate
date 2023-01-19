import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { loginResponse } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule, MatMenuModule,MatIconModule],
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
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.adminProfile = this._authenticationService.currentUserValue;
  }

  goToProfile(): void {
    this._router.navigate(['/profile']);
  }

  goToLogout(): void {
    this._authenticationService.logoutUser();
    this._toasterService.notifySnackbarMsg('loginPage.loggedOut', 'success');
    this._router.navigate(['/auth/login']);
  }



}

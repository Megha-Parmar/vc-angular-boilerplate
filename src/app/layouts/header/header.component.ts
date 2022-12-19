import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private _authenticationService: AuthenticationService,
    public _router: Router,
    private _toasterService: ToasterService,
  ) { }

  ngOnInit(): void {

  }

  goToLogout(): void {
    this._authenticationService.logoutUser();
    this._router.navigate(['/auth/login']);
  }



}

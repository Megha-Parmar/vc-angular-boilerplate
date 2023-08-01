import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { STORAGE } from '@constants/storage.constant';
import { LoginResponse } from '@models/auth.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { CpEventsService } from '@services/cp-events.service';
import { StorageService } from '@services/storage.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgSelectModule, TranslateModule, RouterModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userData: LoginResponse;
  currentLanguage: string;
  menuOpen = false;

  private destroyRef = inject(DestroyRef);

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private storageService: StorageService,
    private utilityService: UtilityService,
    private cpEventsService: CpEventsService
  ) {
    this.matIconRegistry.addSvgIcon(
      'list',
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/list.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'logout',
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/logout.svg")
    );

    this.userData = this.storageService.get(STORAGE.USER_DATA);
    this.currentLanguage = this.storageService.get(STORAGE.CURRENT_LANGUAGE_STATE_KEY);
  }

  ngOnInit(): void {
    this.cpEventsService.toggleSidebar
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: boolean) => {
        this.menuOpen = res;
      });
  }

  changeLanguage(): void {
    this.utilityService.changeLanguage(this.currentLanguage, this.userData?.uuid);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
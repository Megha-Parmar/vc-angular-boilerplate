import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SVG_ICON_LIST } from '@app/core/constants/app.constants';
import { SvgIcon } from '@app/core/models/common.model';
import { CpSvgIconComponent } from '@app/shared/cp-libs/cp-svg-icon/cp-svg-icon.component';
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
  imports: [CommonModule, MatIconModule, NgSelectModule, TranslateModule,
    RouterModule, FormsModule, CpSvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userData: LoginResponse;
  currentLanguage: string;
  menuOpen = false;
  assetSvgIcon = SVG_ICON_LIST;
  private destroyRef = inject(DestroyRef);
  listSvg: SvgIcon;
  logoutSvg: SvgIcon;

  constructor(
    private storageService: StorageService,
    private utilityService: UtilityService,
    private cpEventsService: CpEventsService
  ) {
    this.listSvg = this.assetSvgIcon.find((x) => x.name === 'list');
    this.logoutSvg = this.assetSvgIcon.find((x) => x.name === 'logout');
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
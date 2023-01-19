
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonEventService } from 'src/app/core/services/common-event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[CommonModule, MatSidenavModule,MatToolbarModule,RouterModule,MatIconModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent{
  readonly CDN_URL = environment.contentful.CDN_URL;
  @Input() isOpended = true;

  constructor(
    private CommonEventService: CommonEventService
  ) {


  }

  closeSidebar(event: MatDrawer) {
    this.CommonEventService.isMobileDevice() && event.toggle();
    this.removeOverlay();
  }

  addLayout() {
    this.CommonEventService.sidebarOverlay.next(true);
  }

  removeOverlay() {
    this.CommonEventService.sidebarOverlay.next(false);
  }
}

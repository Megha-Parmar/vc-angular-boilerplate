
import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CommonEventService } from 'src/app/core/services/common-event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
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

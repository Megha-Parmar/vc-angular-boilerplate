
import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { HelperService } from 'src/app/core/utils/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  showFiller = false;
  @Input() isOpended: boolean;
  baseUrl = environment.BASE_URL;
  constructor(
    private helperService: HelperService,
  ) { }

  closeSidebar(event: MatDrawer) {
    this.helperService.isMobileDevice() && event.toggle();
  }

}

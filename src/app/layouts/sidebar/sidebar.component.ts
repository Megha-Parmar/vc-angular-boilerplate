
import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  readonly CDN_URL = environment.contentful.CDN_URL;
  @Input() isOpended: boolean | undefined;
  constructor() { }
}

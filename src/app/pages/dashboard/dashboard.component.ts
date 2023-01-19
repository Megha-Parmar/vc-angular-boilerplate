import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from 'src/app/layouts/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [BreadcrumbComponent, TranslateModule]
})
export class DashboardComponent {

  constructor() { }

}

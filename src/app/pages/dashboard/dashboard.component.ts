import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from 'src/app/layouts/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [CommonModule, BreadcrumbComponent, MatIconModule, TranslateModule]
})
export class DashboardComponent {

  constructor() { }

}

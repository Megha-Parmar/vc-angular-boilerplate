import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@layouts/sidebar/sidebar.component';
import { BreadcrumbComponent } from '@layouts/breadcrumb/breadcrumb.component';
import { CpEventsService } from '@services/cp-events.service';
import { BreadCrumb, BreadcrumbEventModel } from '@models/breadcrumb.model';
import { HeaderComponent } from '@layouts/header/header.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, BreadcrumbComponent, HeaderComponent],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  breadcrumbs!: BreadCrumb[];
  showLastItemCustomLabel!: boolean;
  lastItemCustomLabel!: string;
  menuOpen = false;

  private destroyRef = inject(DestroyRef);

  constructor(
    private cpEventsService: CpEventsService
  ) { }

  /**
   * The ngOnInit function subscribes to a service and updates the breadcrumbs and custom label
   * properties based on the result.
   */
  ngOnInit(): void {
    console.log("testing pre commit hook");
    this.cpEventsService.cpHeaderDataChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: BreadcrumbEventModel) => {
        setTimeout(() => {
          this.breadcrumbs = result.breadcrumbs;
          this.showLastItemCustomLabel = result.showLastItemCustomLabel as boolean;
          this.lastItemCustomLabel = result.lastItemCustomLabel as string;
        }, 100);
      })
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}

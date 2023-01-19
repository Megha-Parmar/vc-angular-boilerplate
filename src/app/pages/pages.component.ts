import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonEventService } from '../core/services/common-event.service';
import { WindowService } from '../core/services/native-window.service';
import { FooterComponent } from '../layouts/footer/footer.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule,SidebarComponent, HeaderComponent,FooterComponent, RouterModule, MatDialogModule],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {

  isOpen = true;
  windowRef: Window;
  showOverlay = false;
  private breakpointObserver$!: Subscription;

  constructor(
    private _windowService: WindowService,
    private CommonEventService: CommonEventService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.windowRef = this._windowService.getWindow() || window;
  }

  ngOnInit(): void {
    this.setDefaultSideNav();
  }

  setDefaultSideNav(): void {
    // detect screen size changes
    this.breakpointObserver$ = this.breakpointObserver.observe(["(max-width: 991px)"]).subscribe((result: BreakpointState) => {
      this.isOpen = !result.matches;
    });
    if (this.windowRef.innerWidth <= 767) {
      this.isOpen = false;
    }
    this.CommonEventService.sidebarOverlay.subscribe({
      next: (showOverlay: boolean) => {
        this.showOverlay = showOverlay;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.breakpointObserver$) {
      this.breakpointObserver$.unsubscribe();
    }
  }
}

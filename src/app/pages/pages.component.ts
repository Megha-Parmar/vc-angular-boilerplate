import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonEventService } from '../core/services/common-event.service';
import { WindowService } from '../core/services/native-window.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit, OnDestroy {

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
    // detect screen size changes
    this.breakpointObserver$ = this.breakpointObserver.observe(["(max-width: 991px)"]).subscribe((result: BreakpointState) => {
      this.isOpen = !result.matches;
    });

    console.log('isOpened', this.isOpen)
    this.setDefaultSideNav();
    this.CommonEventService.sidebarOverlay.subscribe({
      next: (showOverlay: boolean) =>{
        this.showOverlay = showOverlay;
      }
    });
  }

  ngAfterViewInit(): void {
    this.setSideNav();
  }

  setDefaultSideNav(): void {
    if (this.windowRef.innerWidth <= 767) {
      this.isOpen = false;
    }
  }

  setSideNav(): void {
    if (this.windowRef.innerWidth <= 767) {
      this.isOpen = false;
    }
  }

  ngOnDestroy(): void {
    if(this.breakpointObserver$) {
      this.breakpointObserver$.unsubscribe();
    }
  }
}

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { WindowService } from '../core/services/native-window.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit, OnDestroy {

  isOpen = true;
  windowRef: Window;

  constructor(
    private _windowService: WindowService,
  ) {
    this.windowRef = this._windowService.getWindow() || window;
  }

  ngOnInit(): void {
    console.log('isOpened', this.isOpen)
    this.setDefaultSideNav();
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

  }

}

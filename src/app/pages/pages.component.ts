import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit, OnDestroy {

  isOpen = true;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth <= 767) {
      this.isOpen = false;
    }
  }

  ngAfterViewInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(e => {
      if (window.innerWidth <= 767) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.scss']
})
export class DiscountAddComponent implements OnInit, OnDestroy {

  discountId: string = '';
  isViewPage: boolean = false;

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    console.log('_router', this._router.url)
    if (this._activatedRoute.snapshot.paramMap.get('id')) {
      this.discountId = this._activatedRoute.snapshot.paramMap.get('id') as string;
    }
    if (this._router.url.includes('view')) {
      this.isViewPage = true;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

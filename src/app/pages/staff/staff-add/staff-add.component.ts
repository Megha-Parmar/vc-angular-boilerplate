import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent implements OnInit, OnDestroy {

  staffId: string = '';

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) {
    if (this._activatedRoute.snapshot.paramMap.get('id')) {
      this.staffId = this._activatedRoute.snapshot.paramMap.get('id') as string;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

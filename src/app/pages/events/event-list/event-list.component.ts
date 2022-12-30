import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { EventService } from 'src/app/core/services/event.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { EventListModel } from './../../../core/models/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  displayedColumns = ['title', 'vertical_banner_image', 'is_published', 'created_at', 'action'];
  dataSource: MatTableDataSource<EventListModel> | undefined;

  pagination: number[] = Constants.paginationArray;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterValue: string = '';

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _router: Router,
    private eventService: EventService,
    private _toasterService: ToasterService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */

  ngOnInit() {
    this.getEventList();
  }

  getEventList(): void {
    this.eventService.getEventList().pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (result: any) => {
        if (result && result.data) {
          if (result.data) {
            const events = result.data;
            this.dataSource = new MatTableDataSource(events);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log('aaabbcc', this.dataSource);
          }

          // this.dataSource = new MatTableDataSource(this.eventList);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

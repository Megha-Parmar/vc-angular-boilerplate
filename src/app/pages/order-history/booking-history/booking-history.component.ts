import { DatePipe, DecimalPipe, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { Constants } from 'src/app/core/constants/app.constants';
import { BookingHistory } from 'src/app/core/models/booking.model';
import { EventDetailsModel } from 'src/app/core/models/event.model';
import { DownloadCsvService } from 'src/app/core/services/download-csv.service';
import { EventService } from 'src/app/core/services/event.service';
import { BreadcrumbComponent } from 'src/app/layouts/breadcrumb/breadcrumb.component';

export const importsArray = [
  TranslateModule,
  DatePipe,
  DecimalPipe,
  NgIf,
  MatCardModule,
  RouterModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatFormFieldModule,
  FormsModule,
  MatInputModule,
  BreadcrumbComponent,
  MatSortModule
];

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [...importsArray],
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pagination = Constants.paginationArray;
  totalSize: number = 1;
  pageSize = 10;
  page = 1;
  displayedColumns = [
    // 'id',
    'event_name',
    // 'total_bookings',
    'sold_tickets',
    'ticket_from_pos',
    'ticket_from_web',
    'total_amount',
    // 'availability',
    'action',
  ];

  dataSource: MatTableDataSource<BookingHistory>;
  bookingHistoryList: EventDetailsModel[] = [];

  constructor(private eventService: EventService, private downloadService: DownloadCsvService) { }

  ngOnInit(): void {
    this.getBookingHistory();
  }

  getBookingHistory(): void {
    this.eventService.getBookingHistory(this.page, this.pageSize).pipe(take(1)).subscribe((res) => {
      // this.pageSize = res.data.size;
      this.totalSize = res.data.length;
      // this.page = res.data.page;
      this.gridSet(res.data.items || res.data);
    });
  }

  gridSet(event: BookingHistory[]): void {
    this.dataSource = new MatTableDataSource<BookingHistory>(event);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: any): void {
    filterValue = filterValue.target.value.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onPaginateChange(_event: PageEvent): void {
    return;
    // this.page = event.pageIndex + 1;
    // this.pageSize = event.pageSize;
    // this.getBookingHistory();
  }

  downloadCsv(): void {
    const eventList = this.dataSource.filteredData.map(booking => {
      return {
        'Event Name': booking.event_name.charAt(0).toUpperCase() + booking.event_name.slice(1),
        'Ticket Sold': booking.sold_tickets,
        'Ticket Purchase(POS)': booking.ticket_from_pos,
        'Ticket Purchase(Web)': booking.ticket_from_web,
        'Total Payment': booking.total_amount
      };
    });
    this.downloadService.downloadCsv(eventList, 'Booking History', 'Booking History');
  }
}

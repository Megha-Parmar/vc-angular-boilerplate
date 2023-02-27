import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe, DecimalPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { take } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { ChartOptions } from 'src/app/core/models/chart.model';
import { EventReportTiles } from 'src/app/core/models/dashboard.model';
import { EventDetailsModel, EventSlot } from 'src/app/core/models/event.model';
import { BookingUserModel, UserListModel } from 'src/app/core/models/user.model';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { DownloadCsvService } from 'src/app/core/services/download-csv.service';
import { EventService } from 'src/app/core/services/event.service';
import { BreadcrumbComponent } from 'src/app/layouts/breadcrumb/breadcrumb.component';

export const importsArray = [
  TranslateModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgIf,
  NgForOf,
  MatPaginatorModule,
  FormsModule,
  MatCardModule,
  MatTableModule,
  MatSelectModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NgApexchartsModule,
  RouterModule,
  BreadcrumbComponent,
  MatButtonModule,
  MatSortModule
];

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [...importsArray],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BookingDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("chart") chart: ChartComponent;

  pagination = Constants.paginationArray;
  dateFormat = Constants.generalConstant.dateFormat;
  pageSize = 10;
  page = 1;
  totalSize: number = 1;
  displayedColumns = [
    // 'id',
    'expand',
    'booking_id',
    'name',
    // 'email',
    // 'phone_number',
    'total_ticket',
    'total_checking',
    'paid_amount',
    'booking_date',
    'purchased_on'
    // 'status',
  ];

  eventId: string;
  expandedElement: UserListModel;
  dataSource: MatTableDataSource<UserListModel>;
  selectedSlot: string | undefined;
  eventTimeSlots: EventSlot[] = [];
  nonRepeatSlot: EventSlot[] = [];
  eventDetails: EventDetailsModel;
  start_date: string;
  end_date: string;
  selectedDate: string;
  bookingChart: Partial<ChartOptions> | any;
  revenueChart: Partial<ChartOptions> | any;
  bookingReport: number;
  revenueReport: number;
  tilesDetails: EventReportTiles;
  userBookingList: any[] = [];

  constructor(private eventService: EventService, private downloadService: DownloadCsvService, private activatedRoute: ActivatedRoute, private dateService: DateFormatService) { }

  ngOnInit(): void {
    this.eventId = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bookingChart = Constants.UserBookingChartConfig;
    this.revenueChart = Constants.UserRevenueChartConfig;
    this.getEventTypeDetails();
  }

  getEventTypeDetails(): void {
    this.eventService.getEventById(this.eventId).pipe(take(1)).subscribe((res) => {
      this.eventDetails = res.data;
      this.selectedSlot = res.data.event_timeslots[0].uuid;
      // this.selectedDate = this.eventDetails.start_date;
      this.start_date = this.eventDetails.start_date;
      this.end_date = this.eventDetails.end_date;
      this.eventTimeSlots = this.getRequireSlot(this.selectedDate);
      this.getUserDetails();
    });
  }

  getUserDetails(): void {
    const start_date = this.dateService.getDateFormat(this.start_date);
    const end_date = this.dateService.getDateFormat(this.end_date);
    this.eventTimeSlots = this.getRequireSlot(start_date);
    this.eventService.getUserDetails(this.eventId, this.selectedSlot, start_date, end_date, this.page, this.pageSize)
      .pipe(take(1))
      .subscribe((res) => {
        this.pageSize = res.data.size;
        this.totalSize = res.data.total;
        this.page = res.data.page;
        // this.getTiles(start_date, end_date);
        this.userBookingList = res.data.items;
        this.gridSet(res.data);
        this.getBookingReport();
        this.getRevenueReport();
      });
  }

  getRequireSlot(date: string): any {
    let slot: EventSlot[] = [];
    if (this.eventDetails.event_timeslots[0].event_type === 'fulltime') {
      slot = this.eventDetails.event_timeslots;
    }
    else {
      const repeatSlot = this.eventDetails.event_timeslots.filter((e: EventSlot) => e.is_repeat);
      const nonRepeatSlot = this.eventDetails.event_timeslots.filter((e: EventSlot) => !e.is_repeat);
      const selectedNonRepeatSlot = nonRepeatSlot.filter((e: EventSlot) => e.event_date === date);
      slot = slot.concat(repeatSlot, selectedNonRepeatSlot);
    }
    slot.forEach(slot => {
      slot.start_time = this.getTimeSlot(slot.start_time),
        slot.end_time = this.getTimeSlot(slot.end_time);
    });
    return slot;
  }


  gridSet(event: BookingUserModel): void {
    this.dataSource = new MatTableDataSource<UserListModel>(event.items);
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onChange(event: any): void {
    this.selectedSlot = event.value;
    // this.getUserDetails();
  }

  onPaginateChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getUserDetails();
  }

  getBookingReport(): void {
    const start_date = this.dateService.getDateFormat(this.start_date);
    const end_date = this.dateService.getDateFormat(this.end_date);
    this.eventService.getBookingReport(this.eventId, this.selectedSlot, start_date, end_date, this.page, this.pageSize)
      .pipe(take(1))
      .subscribe((res) => {
        this.setGraphValue(res.data);
      });
  }

  setGraphValue(data: any): void {
    const key = Object.keys(data.graph_data);
    const obj = Object.values(data.graph_data);
    this.bookingReport = key.length;
    this.bookingChart.series = obj;
    this.bookingChart.labels = key;
  }

  getRevenueReport(): void {
    const start_date = this.dateService.getDateFormat(this.start_date);
    const end_date = this.dateService.getDateFormat(this.end_date);
    this.eventService.getRevenueReport(this.eventId, this.selectedSlot, start_date, end_date, this.page, this.pageSize)
      .pipe(take(1))
      .subscribe((res) => {
        const key = Object.keys(res.data.graph_data);
        const obj = Object.values(res.data.graph_data);
        this.revenueReport = key.length;
        this.revenueChart.series = obj;
        this.revenueChart.labels = key;
      });
  }

  getTiles(start_date: string, end_date: string): void {
    this.eventService.getEventReportTiles(this.eventId, this.selectedSlot, start_date, end_date, this.page, this.pageSize)
      .pipe(take(1))
      .subscribe((res) => {
        this.tilesDetails = res.data;
      });
  }

  getTimeSlot(time: string): Date {
    const currentDate = new Date();
    return this.dateService.getTimeSlot(currentDate, time);
  }

  downloadCsv(): void {
    const bookingList = this.userBookingList.map(booking => {
      return {
        'Booking Id': booking.booking_id,
        'Name': booking.name || '-',
        'Email': booking.email || '-',
        'Phone Number': booking.phone_number || '-',
        'Total Ticket': booking.total_ticket,
        'Total Checkin': booking.total_checkin,
        'Paid Amount': booking.total_amount,
        'Status': booking.status,
      };
    });
    this.downloadService.downloadCsv(bookingList, 'Booking', 'Booking');
  }
}


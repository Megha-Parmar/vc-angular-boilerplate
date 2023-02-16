import { DatePipe, DecimalPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { take } from 'rxjs/operators';
import { Constants } from 'src/app/core/constants/app.constants';
import { ChartOptions } from 'src/app/core/models/chart.model';
import { DashboardTilesModel, EventDetailsModel } from 'src/app/core/models/dashboard.model';
import { BookingModel } from 'src/app/core/models/reports.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { ReportService } from 'src/app/core/services/report.service';
import { BreadcrumbComponent } from 'src/app/layouts/breadcrumb/breadcrumb.component';

export const importsArray = [NgClass, NgIf, DecimalPipe, DatePipe, BreadcrumbComponent, TranslateModule, MatCardModule, MatIconModule, NgApexchartsModule, MatPaginatorModule, MatSortModule, MatTableModule]

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [...importsArray]
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('orderSort') sort: MatSort;
  @ViewChild('eventSort') sorting: MatSort;
  @ViewChild('bookingSort') bookingSort: MatSort;

  posChart: Partial<ChartOptions> | any;
  earningChart: Partial<ChartOptions> | any;
  visitorChart: Partial<ChartOptions> | any;
  revenueChart: Partial<ChartOptions> | any;
  bookingChart: Partial<ChartOptions> | any;

  // pagination: number[] = Constants.paginationArray;
  orderDataSource: MatTableDataSource<any>;
  pageSize = 5;
  page = 1;
  totalSize: number = 1;
  dashboardDetails: DashboardTilesModel;
  todaysBookingDataSource: MatTableDataSource<any>;
  eventOnGoingDataSource: MatTableDataSource<EventDetailsModel>;
  dateFormat = Constants.generalConstant.dateFormat;

  orderListColumns = [
    'order_id',
    'transaction_id',
    'name',
    'email',
    'phone_number',
    'payable_amount',
    'discount_amount',
    'payment_method',
    'order_from',
    'total_tickets',
  ];

  eventListColumns = [
    'event_name',
    'event_type',
    'venue',
    'start_date',
    'total_sold_ticket',
    'total_earnings',
  ];

  ticketColumns = [
    'booking_id',
    'customer_name',
    'customer_email',
    'customer_phone_number',
    'event_name',
    // 'time',
  ];

  constructor(private reportService: ReportService, private dashboardService: DashboardService, private dateService: DateFormatService) { }

  ngOnInit(): void {
    this.getTiles();
    this.bookingChart = Constants.BookingChartConfig;
    this.earningChart = Constants.EarningChartConfig;
    // this.visitorChart = Constants.VisitorChartConfig;
    this.bookingChart.series = [50, 80];
    this.earningChart.series = [30, 80]
  }

  getTiles(): void {
    this.dashboardService.getDashboardTilesData().pipe(take(1)).subscribe({
      next: (res) => {
        this.dashboardDetails = res.data;
        this.bookingChart.series = [res.data.total_offline_bookings, res.data.total_online_bookings];
        this.earningChart.series = [res.data.total_revenue_ofline, res.data.total_revenue_online];

        this.setData();
      },
      error: () => {
        this.bookingChart.series = [];
        this.earningChart.series = [];

        this.orderDataSource = new MatTableDataSource<any>([]);
        this.orderDataSource.sort = this.sort;

        this.todaysBookingDataSource = new MatTableDataSource<BookingModel>([]);
        this.todaysBookingDataSource.sort = this.bookingSort;

        this.eventOnGoingDataSource = new MatTableDataSource<EventDetailsModel>([]);
        this.eventOnGoingDataSource.sort = this.sorting;
      }
    })
  }

  setData() {
    this.getVisitorGraph();
    this.getOrderList();
    this.getTodaysBooking();
    this.getEventOnGoingList();
  }

  getOrderList(): void {
    this.reportService.getOrderList(this.page, this.pageSize).pipe(take(1)).subscribe({
      next: (res) => {
        this.orderDataSource = new MatTableDataSource<any>(res.data.items);
        // this.orderDataSource.paginator = this.paginator;
        this.orderDataSource.sort = this.sort;
      },
      error: () => {
        this.orderDataSource = new MatTableDataSource<any>([]);
        this.orderDataSource.sort = this.sort;
      }
    })
  }

  getTodaysBooking(): void {
    this.dashboardService.getTodaysBooking(this.page, this.pageSize).subscribe({
      next: (res) => {
        res.data.items.forEach((slot: any) => {
          slot.time_slots_starttime = this.getTimeSlot(slot.time_slots_starttime),
            slot.time_slots_endtime = this.getTimeSlot(slot.time_slots_endtime)
        });
        this.todaysBookingDataSource = new MatTableDataSource<BookingModel>(res.data.items);
        this.todaysBookingDataSource.sort = this.bookingSort;
        // this.todaysBookingDataSource.paginator = this.paginator;
      },
      error: () => {
        this.todaysBookingDataSource = new MatTableDataSource<BookingModel>([]);
        this.todaysBookingDataSource.sort = this.bookingSort;
      }
    })
  }

  getEventOnGoingList(): void {
    this.dashboardService.getEventOnGoingEvents(this.page, this.pageSize).subscribe({
      next: (res) => {
        this.eventOnGoingDataSource = new MatTableDataSource<EventDetailsModel>(res.data.items);
        this.eventOnGoingDataSource.sort = this.sorting;
        // this.eventOnGoingDataSource.paginator = this.paginator;
      },
      error: () => {
        this.eventOnGoingDataSource = new MatTableDataSource<EventDetailsModel>([]);
        this.eventOnGoingDataSource.sort = this.sorting;
      }
    })
  }

  getVisitorGraph(): void {
    this.dashboardService.getVisitorGraph().subscribe({
      next: (res) => {
        const key = Object.keys(res.data);
        const obj = Object.values(res.data);
        this.setGraph(key, obj)
      }
    })
  }

  setGraph(key: any, obj: any): void {
    this.visitorChart = {
      series: [
        {
          name: "visitors",
          data: obj
        }
      ],
      chart: {
        type: "bar",
        height: 300,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: key
      },
      yaxis: {
        title: {
          text: "No. of Visitors"
        },
        labels: {
          formatter: (value: number) => {
            return value.toFixed(0)
          },
        },
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return "$ " + val + " thousands";
          }
        }
      }
    }
  }

  getTimeSlot(time: string): Date {
    const currentDate = new Date();
    return this.dateService.getTimeSlot(currentDate, time);
  }
}

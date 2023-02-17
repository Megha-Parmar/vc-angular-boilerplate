import { DatePipe, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { Constants } from 'src/app/core/constants/app.constants';
import { ChartOptions } from 'src/app/core/models/chart.model';
import { EventDetailsModel } from 'src/app/core/models/event.model';
import { ReportService } from 'src/app/core/services/report.service';
import { BreadcrumbComponent } from 'src/app/layouts/breadcrumb/breadcrumb.component';

export const importsArray = [DatePipe, NgIf, TranslateModule, MatCardModule, MatTableModule, MatIconModule, BreadcrumbComponent];

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [...importsArray],
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  pageSize = 5;
  page = 1;
  totalSize: number = 1;
  chartOptions: Partial<ChartOptions> | any;
  bookingChart: Partial<ChartOptions> | any;
  pagination = Constants.paginationArray;
  tilesDetails: any;
  dateFormat = Constants.generalConstant.dateFormat;

  displayedColumns = [
    'order_id',
    'transaction_id',
    'name',
    'email',
    'phone_number',
    'payable_amount',
    'discount_amount',
    'payment_method',
    'purchased_on',
    'order_from',
    'total_tickets',
  ];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(): void {
    this.reportService.getOrderList(this.page, this.pageSize)
      .pipe(take(1))
      .subscribe((res) => {
        this.gridSet(res);
        this.getSalesTitles();
      });
  }

  gridSet(res: any): void {
    if (res.data?.items) {
      this.dataSource = new MatTableDataSource<EventDetailsModel>(res.data.items);
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      this.pageSize = res.data.size;
      this.totalSize = res.data.total;
      this.page = res.data.page;
    } else {
      this.dataSource = new MatTableDataSource<EventDetailsModel>([]);
      this.dataSource.sort = this.sort;
    }
  }

  onPaginateChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getOrderList();
  }

  getSalesTitles(): void {
    this.reportService.getSalesTiles()
      .pipe(take(1))
      .subscribe((res) => {
        this.tilesDetails = res.data;
      });
  }
}

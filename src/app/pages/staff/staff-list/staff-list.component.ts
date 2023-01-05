import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constants } from 'src/app/core/constants/app.constants';
import { DiscountListModel } from 'src/app/core/models/discount.model';
import { APIResponse } from 'src/app/core/models/general.model';
import { DiscountService } from 'src/app/core/services/discount.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit, OnDestroy {
  displayedColumns = ['title', 'discount_code', 'discount_value', 'is_published', 'max_avail_limit_per_user', 'action'];
  dataSource: MatTableDataSource<DiscountListModel>;

  pagination: number[] = Constants.paginationArray;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterValue: string = '';

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _router: Router,
    private _discountService: DiscountService,
    private _toasterService: ToasterService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */

  ngOnInit() {
    this.getDiscountList();
  }

  getDiscountList(): void {
    this._discountService.getDiscountList().pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (result: APIResponse<DiscountListModel[]>) => {
        if (result && result.data) {
          this.dataSource = new MatTableDataSource(result.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    });
  }

  applyFilter(event: KeyboardEvent): void {
    if (event) {
      let filterValue = this.filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }

  /**
   * This function navigates to the edit page of the Event with the id that is passed in.
   * @param {string} id - string - the id of the Event to edit
   */
  editDiscount(id: string): void {
    this._router.navigate([`/discount/${id}/edit`]);
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

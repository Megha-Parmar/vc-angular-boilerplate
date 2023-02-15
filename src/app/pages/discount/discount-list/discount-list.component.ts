import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { Constants } from 'src/app/core/constants/app.constants';
import { DiscountListModel } from 'src/app/core/models/discount.model';
import { APIResponse } from 'src/app/core/models/general.model';
import { DiscountService } from 'src/app/core/services/discount.service';
import { PopupOpenService } from 'src/app/core/services/popup-open.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { BreadcrumbComponent } from 'src/app/layouts/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-discount-list',
  standalone: true,
  imports: [CommonModule,BreadcrumbComponent,ConfirmationComponent, MatTableModule, MatPaginatorModule,FormsModule, MatInputModule,
    MatIconModule, TranslateModule, MatFormFieldModule, MatSortModule],
  providers:[PopupOpenService],
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit, OnDestroy {
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
    private _popupOpenService: PopupOpenService,
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
  editDiscount(id: string, page: string): void {
    if (page === 'view') {
      this._router.navigate([`/discount/${id}/view`]);
    } else {
      this._router.navigate([`/discount/${id}/edit`]);
    }
  }

  deleteDiscount(id: string, name: string): void {
    const commonData = {
      title: 'Re-login required.',
      detail: `Do you want to delete`,
      highLightedText: `${name} ?`,
      okText: 'Ok',
      cancelText: 'Cancel',
      type: 'inactivity'
    };
    const dialogRef = this._popupOpenService.openPopup(commonData, '90%', true, {
      panelClass: 'custom-modal',
      maxWidth: '500px',
    });
    dialogRef.afterClosed().subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        this.deleteDiscountRecord(id);
      }
    });
  }

  deleteDiscountRecord(id: string): void {
    this._discountService.deleteDiscount(id).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (res) => {
        if (res) {
          this._toasterService.notifySnackbarMsg('discountListPage.discountDeleteSuccessfully', 'success');
        }
        this.getDiscountList()
      }, error: () => { }
    })
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

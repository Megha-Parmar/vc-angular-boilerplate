import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { Constants } from 'src/app/core/constants/app.constants';
import { APIResponse } from 'src/app/core/models/general.model';
import { StaffListModel } from 'src/app/core/models/staff.model';
import { PopupOpenService } from 'src/app/core/services/popup-open.service';
import { StaffService } from 'src/app/core/services/staff.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { BreadcrumbComponent } from 'src/app/layouts/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ConfirmationComponent, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule,
    MatIconModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatButtonModule, TranslateModule, FormsModule],
  providers:[PopupOpenService],
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'email', 'role', 'status', 'is_active', 'action'];
  dataSource: MatTableDataSource<StaffListModel>;

  pagination: number[] = Constants.paginationArray;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterValue: string = '';

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _router: Router,
    private _staffService: StaffService,
    private _toasterService: ToasterService,
    private _popupOpenService: PopupOpenService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  /**
   *
   *
   * @memberof StaffListComponent
   */
  ngOnInit() {
    this.getStaffList();
  }

  /**
   *
   *
   * @memberof StaffListComponent
   */
  getStaffList(): void {
    this._staffService.getStaffList().pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (result: APIResponse<StaffListModel[]>) => {
        if (result && result.data) {
          this.dataSource = new MatTableDataSource(result.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }, error: () => { },
    });
  }

  /**
   *
   *
   * @param {KeyboardEvent} event
   * @memberof StaffListComponent
   */
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
    this._router.navigate([`/staff/${id}/edit`]);
  }

  /**
   *
   *
   * @param {string} id
   * @param {boolean} status
   * @memberof StaffListComponent
   */

  updateStaffStatus(id: string, status: boolean): void {
    const staffStatus = status === true ? false : true;
    this._staffService.updateStaffStatus(id, staffStatus).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: () => {
        // if (res && res.data && res.data.status === 200) {

        // }
        this._toasterService.notifySnackbarMsg('staffListPage.staffStatusUpdateSuccessfully', 'success');
        this.getStaffList()
      }, error: () => { }
    })
  }

  deleteStaff(id: string, name: string): void {
    const commonData = {
      title: 'Re-login required.',
      detail: `Do you want to delete staff`,
      highLightedText: `${name} ?`,
      okText: 'Ok',
      cancelText: 'Cancel',
      type: 'inactivity'
    };
    const dialogRef = this._popupOpenService.openPopup(ConfirmationComponent, commonData, '90%', true, {
      panelClass: 'custom-modal',
      maxWidth: '500px',
    });
    dialogRef.afterClosed().subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        this.deleteStaffRecord(id);
      }
    });
  }

  deleteStaffRecord(id: string): void {
    this._staffService.deleteStaff(id).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (res) => {
        if (res && res.data) {
          this._toasterService.notifySnackbarMsg('staffListPage.staffDeleteSuccessfully', 'success');
        }
        this.getStaffList()
      }, error: () => { }
    })
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

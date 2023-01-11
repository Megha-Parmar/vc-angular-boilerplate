import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { Constants } from 'src/app/core/constants/app.constants';
import { APIResponse } from 'src/app/core/models/general.model';
import { StaffListModel } from 'src/app/core/models/staff.model';
import { LoaderService } from 'src/app/core/services/loader.service';
import { PopupOpenService } from 'src/app/core/services/popup-open.service';
import { StaffService } from 'src/app/core/services/staff.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'email', 'role', 'status', 'action'];
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
    private _loaderService: LoaderService,
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
    this._loaderService.showHideLoader(true);
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
        this._loaderService.showHideLoader(false);
      },
      error: () => {
        this._loaderService.showHideLoader(false);
      },
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
    this._loaderService.showHideLoader(true);
    this._staffService.updateStaffStatus(id, staffStatus).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (res) => {
        this._toasterService.notifySnackbarMsg('staffListPage.staffStatusUpdateSuccessfully', 'success');
        this.getStaffList()
      }, error: () => {
        this._loaderService.showHideLoader(false);
      }
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
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

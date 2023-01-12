import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { Constants, messageType } from 'src/app/core/constants/app.constants';
import { APIResponse } from 'src/app/core/models/general.model';
import { EventService } from 'src/app/core/services/event.service';
import { PopupOpenService } from 'src/app/core/services/popup-open.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { EventListModel } from './../../../core/models/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  displayedColumns = ['title', 'vertical_banner_image', 'is_published', 'created_at', 'action'];
  dataSource: MatTableDataSource<EventListModel>;

  pagination: number[] = Constants.paginationArray;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterValue: string = '';

  private unSubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _router: Router,
    private _eventService: EventService,
    private _toasterService: ToasterService,
    private _popUpService: PopupOpenService
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
    this._eventService.getEventList().pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (result: APIResponse<EventListModel[]>) => {
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

  deleteEvent(id: string): void {
    this._eventService.deleteEvent(id).pipe(takeUntil(this.unSubscriber)).subscribe({next: (resp: APIResponse<EventListModel>) => {
          if (resp) {
            this._toasterService.notifySnackbarMsg(resp.message, messageType.success);
            this.getEventList();
          }
        },
      });
  }

  onDeleteConfirmation(id: string, name: string): void {
    const commonData = {
      detail :'eventListPage.deleteConformationText',
      highLightedText: `${name} ?`,
      okText: 'Ok',
      cancelText: 'Cancel',
      type: 'inactivity'
    }

    const dialogRef = this._popUpService.openPopup(ConfirmationComponent, commonData,'500px', true);
    // const dialogRef = this._matDialog.open(DeleteConfirmationDialogComponent, {
    //   data: {
    //     confirmationText: 'eventListPage.deleteConformationText',
    //     details: name,
    //   },
    //   disableClose:true,
    //   autoFocus: false
    // });
    dialogRef.afterClosed().subscribe((resp: boolean) => {
      if (resp) {
        console.log(resp);

        // this.deleteEvent(id);
      }
    });
  }

  /**
   * This function navigates to the edit page of the Event with the id that is passed in.
   * @param {string} id - string - the id of the Event to edit
   */
  editEvent(id: string): void {
    this._router.navigate([`/event/${id}/edit`]);
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}

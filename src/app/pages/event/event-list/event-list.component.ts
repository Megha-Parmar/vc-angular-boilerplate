import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { Constants, MessageConstant, messageType } from 'src/app/core/constants/app.constants';
import { EventListModel } from 'src/app/core/models/event.model';
import { APIResponse } from 'src/app/core/models/general.model';
import { EventService } from 'src/app/core/services/event.service';
import { WindowService } from 'src/app/core/services/native-window.service';
import { PopupOpenService } from 'src/app/core/services/popup-open.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { BreadcrumbComponent } from 'src/app/layouts/breadcrumb/breadcrumb.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ConfirmationComponent, MatFormFieldModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatInputModule, MatIconModule, TranslateModule, FormsModule, MatSlideToggleModule],
  providers: [PopupOpenService],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  displayedColumns = ['title', 'vertical_banner_image', 'created_at', 'is_published', 'status', 'action'];
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
    private _popUpService: PopupOpenService,
    private window: WindowService
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

  deleteEvent(id: string, name: string): void {
    const commonData = {
      detail: 'eventListPage.deleteConformationText',
      highLightedText: `${name} ?`,
      okText: 'Ok',
      cancelText: 'Cancel',
      type: 'inactivity'
    }
    const dialogRef = this._popUpService.openPopup(commonData, '90%', true, {
      panelClass: 'custom-modal',
      maxWidth: '500px',
    });
    dialogRef.afterClosed().subscribe((resp: boolean) => {
      if (resp) {
        this.deleteEventRecord(id);
      }
    });
  }

  onPreview(id: string, title: string): void {
    const titleName: string = title.replace(/[^a-zA-Z ]/g, '');
    const nameInRoute: String = titleName.toLowerCase().split(' ').join('-');
    this.window.getWindow().open(environment.contentful.FRONTEND_URL + 'event/' + nameInRoute + '/' + id, '_blank');
  }

  updateStatus(id: string, status: boolean): void {
    const eventStatus = status === true ? false : true;
    this._eventService.updateEventStatus(id, { is_paused: eventStatus }).subscribe({
      next: () => {
        this._toasterService.displaySnackBar(MessageConstant.successMessage.eventStatusUpdateSuccess, messageType.success);
        this.getEventList();
      }
    })
  }

  deleteEventRecord(id: string): void {
    this._eventService.deleteEvent(id).pipe(takeUntil(this.unSubscriber)).subscribe({
      next: (res) => {
        if (res) {
          this._toasterService.notifySnackbarMsg('eventListPage.eventDeleteSuccessfully', 'success');
        }
        this.getEventList()
      }
    })

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

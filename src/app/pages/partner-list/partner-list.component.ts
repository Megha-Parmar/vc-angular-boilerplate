import { Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadCrumb } from '@models/breadcrumb.model';
import { CpEventsService } from '@services/cp-events.service';
import { PartnerDetail, PartnerList } from '@models/partner.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectionModel } from '@angular/cdk/collections';
import { COUNTRY_LIST, MessageType, PAGE_SIZE, SORT_OPTIONS } from '@constants/app.constants';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CpButtonComponent } from '@app/shared/cp-libs/cp-button/cp-button.component';
import { MatButtonModule } from '@angular/material/button';
import { PartnerService } from '@services/partner.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { CpLoaderComponent } from '@app/shared/cp-libs/cp-loader/cp-loader.component';
import { CpActionToolbarComponent } from '@app/shared/cp-libs/cp-action-toolbar/cp-action-toolbar.component';
import { AlertToastrService } from '@services/alert-toastr.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, TranslateModule, MatPaginatorModule, MatCheckboxModule, CpButtonComponent, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule, NgSelectModule, CpLoaderComponent, CpActionToolbarComponent],
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent{
  
  breadcrumbs: BreadCrumb[] = [];
  partnerList = new MatTableDataSource<PartnerDetail>();
  columnLabel = ['partnerId', 'companyName', 'street', 'zip', 'city', 'country', 'email', 'phoneNo', 'isActive', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = PAGE_SIZE;
  searchControl = new FormControl('');
  sortValue = new FormControl('newest');
  sortOptions = SORT_OPTIONS;
  searchValue: string;
  isLoading = false;

  private destroyRef = inject(DestroyRef);
  
  constructor(
    private route: ActivatedRoute,
    private cpEventsService: CpEventsService,
    private partnerService: PartnerService,
    private router: Router,
    private toasterService: AlertToastrService,
    public translateService: TranslateService
  ) {
    this.breadcrumbs = this.route.snapshot.data.breadcrumbs;
  }

  ngOnInit(): void {
    this.cpEventsService.cpHeaderDataChanged.emit({ breadcrumbs: this.breadcrumbs });
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (value: string) => {
        this.onSearch(value);
      }
    });
    this.getPartnerList();
  }

  /**
   * This function retrieves a list of partners with specified parameters and updates the UI
   * accordingly.
   */
  getPartnerList(): void {
    const params = {
      sort: this.sortValue.value,
      pageSize: this.paginator?.pageSize || 10, 
      page: (this.paginator?.pageIndex + 1) || 1,
      ...this.searchValue && { search: this.searchValue }
    }
    this.isLoading = true;
    this.partnerList = new MatTableDataSource([]);
    this.partnerService.getPartnerList(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: PartnerList) => {
          if (res) {
            this.isLoading = false;
            res.records.map((el: PartnerDetail) => {
              COUNTRY_LIST.forEach((country) => {
                if (el.country === country.value){
                  el.country = country.label.charAt(0).toUpperCase() + country.label.slice(1);
                }
                return;
              })
              el.partnerAction = [
                {
                  label: 'partner.edit',
                  callback: this.editPartner.bind(this)
                },
                {
                  label: el.isActive ? 'partner.markAsInactive' : 'partner.markAsActive',
                  callback: this.updateStatus.bind(this)
                }
              ]
            });
            this.partnerList = new MatTableDataSource(res.records);
            this.paginator.length = res.totalCount;
          }
        },
        error: () => {
          this.isLoading = false;
        }
      })
  }

  ngAfterViewInit(): void {
    this.partnerList.paginator = this.paginator;
  }
  
  /**
   * The function navigates to a specific partner detail page using the partner's UUID.
   * @param {PartnerDetail} row - PartnerDetail object that contains details of a partner, such as
   * their UUID, name, and other relevant information.
   */
  editPartner(row: PartnerDetail): void {
    this.router.navigate([`../${row.uuid}`], { relativeTo: this.route });
  }

  /* `updateStatus` is a function that updates the status of a partner (whether it is active or
  inactive) by calling the `updatePartnerDetail` function from the `PartnerService`. It takes in a
  `PartnerDetail` object as a parameter, toggles the `isActive` property of the object, and then
  calls the `updatePartnerDetail` function with the updated object and the UUID of the partner. If
  the update is successful, it displays a success message using the `toasterService` and calls the
  `getPartnerList` function to update the UI with the new partner list. */
  updateStatus(row: PartnerDetail): void {
    this.partnerService.updatePartnerDetail({ isActive: !row.isActive }, row.uuid)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toasterService.displaySnackBarWithTranslation('toasterMessage.updateStatusSuccessful', MessageType.success);
          this.getPartnerList();
        },
      })
  }

  /**
   * The function resets the paginator, sets a search value if it meets certain criteria, and retrieves
   * a list of partners.
   * @param {string} searchValue - a string value that represents the search query entered by the user.
   * It is used to filter the list of partners based on certain criteria. If the searchValue is empty
   * or less than 4 characters, the list will not be filtered. The function also resets the paginator
   * to the first page and calls the
   */
  onSearch(searchValue: string): void {
    this.paginator.firstPage();
    if (
      searchValue && 
      searchValue.trim() !== '' && 
      searchValue.trim().length >= 4
    ) {
      this.searchValue = searchValue;
    } else {
      this.searchValue = '';
    }
    this.getPartnerList();
  }

  /**
   * This function navigates to the "add" route relative to the current route using the Angular router.
   */
  navigateToAddPartner(): void {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }
}

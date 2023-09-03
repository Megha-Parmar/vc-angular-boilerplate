import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@app/core/services/dialog.service';
import { VcInputComponent } from '@app/shared/vc-libs/vc-input/vc-input.component';
import {
  COUNTRY_LIST,
  DEBOUNCE_TIME,
  DEFAULT_MAT_DIALOG_CONFIG,
  MessageType,
  PAGE_SIZE,
  PositionEnum,
  SORT_OPTIONS
} from '@constants/app.constants';
import { BreadCrumb } from '@models/breadcrumb.model';
import { PartnerDetail, PartnerList } from '@models/partner.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';
import { PartnerService } from '@services/partner.service';
import { VcEventsService } from '@services/vc-events.service';
import { VcActionToolbarComponent } from '@vc-libs/vc-action-toolbar/vc-action-toolbar.component';
import { VcLoaderComponent } from '@vc-libs/vc-loader/vc-loader.component';
import {
  DotToBracketPipe, VcButtonComponent, VcTableBodyDirective, VcTableComponent,
  VcTableHeaderDirective
} from 'ng-utility-library';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, TranslateModule, MatPaginatorModule, MatCheckboxModule,
    VcTableComponent, VcTableBodyDirective, VcTableHeaderDirective,
    VcButtonComponent, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule, DotToBracketPipe,
    NgSelectModule, VcLoaderComponent, VcActionToolbarComponent, VcInputComponent],
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {
  //   @ContentChild(VcTableHeaderDirective) public tableHeader!: VcTableHeaderDirective;
  // @ContentChild(VcTableBodyDirective) public tableBody!: VcTableBodyDirective;
  breadcrumbs: BreadCrumb[] = [];
  partnerList = new MatTableDataSource<PartnerDetail>();
  columnLabel = [
    'partnerId', 'companyName', 'street', 'zip', 'city', 'country', 'email', 'phoneNo', 'isActive', 'action'
  ];
  page: any = 1;

  columnLabel2 = [
    { key: 'partnerId', value: 'SR' },
    { key: 'companyName', value: 'Company Name' },
    { key: 'street', value: 'Street' },
    { key: 'zip', value: 'Zip' },
    { key: 'city', value: 'City' },
    { key: 'country', value: 'Country' },
    { key: 'email', value: 'Email' },
    { key: 'phoneNo', value: 'Phone No' },
    { key: 'isActive', value: 'Is Active' },
    { key: 'action', value: '' },

    'partnerId', 'companyName', 'street', 'zip', 'city', 'country', 'email', 'phoneNo', 'isActive', 'action'
  ];

  // columns = columns;
  data: any[] = [];// = data;


  columns = [
    //   {
    //   colName: 'ID',
    //   fieldName: '_id'
    // },
    {
      colName: 'Company Name',
      fieldName: 'companyName'
    },
    {
      colName: 'Street',
      fieldName: 'address.street'
    },
    {
      colName: 'Zip',
      fieldName: 'address.zip'
    },
    {
      colName: 'City',
      fieldName: 'address.city'
    },
    {
      colName: 'Country',
      fieldName: 'address.country'
    },
    {
      colName: 'Email',
      fieldName: 'email'
    },
    { colName: 'Phone No', fieldName: 'phoneNo' },
    { colName: 'Status', fieldName: 'isActive' },
    { colName: 'Action', fieldName: 'action', },
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchControl = new FormControl('');
  sortValue = new FormControl('newest');
  searchValue: string;
  isLoading = false;

  readonly pageSizeOptions = PAGE_SIZE;
  readonly sortOptions = SORT_OPTIONS;
  readonly position = PositionEnum;

  private destroyRef = inject(DestroyRef);
  totalData: number;

  constructor(
    private route: ActivatedRoute,
    private vcEventsService: VcEventsService,
    private partnerService: PartnerService,
    private router: Router,
    private toasterService: AlertToastrService,
    public translateService: TranslateService,
    private dialogService: DialogService
  ) {
    this.breadcrumbs = this.route.snapshot.data.breadcrumbs;
  }

  ngOnInit(): void {
    this.vcEventsService.emitBreadcrumbsDetail(this.breadcrumbs);
    this.searchData();
    this.getPartnerList();
  }

  searchData(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (value: string) => {
          this.onSearch(value);
        }
      });
  }

  getPartnerList(): void {
    const params = {
      sort: this.sortValue.value,
      pageSize: 1,// this.paginator?.pageSize || DEFAULT_PAGE_SIZE,
      page: this.page,//(this.paginator?.pageIndex + 1) || DEFAULT_PAGE_INDEX,
      ...this.searchValue && { search: this.searchValue }
    };
    this.isLoading = true;
    this.partnerList = new MatTableDataSource([]);
    this.partnerService.getPartnerList(params)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isLoading = false))
      .subscribe((res: PartnerList) => {
        if (res) {
          res.records.forEach((el: PartnerDetail | any) => {
            COUNTRY_LIST.forEach((country) => {
              if (el.address.country === country.value) {
                el.address.country = `${country.label.charAt(0).toUpperCase()}${country.label.slice(1)}`;
              }
            });
            el.partnerAction = [
              {
                label: 'partner.edit',
                callback: this.editPartner.bind(this)
              },
              {
                label: 'partner.delete',
                callback: this.deletePartner.bind(this)
              },
              {
                label: el.isActive ? 'partner.markAsInactive' : 'partner.markAsActive',
                callback: this.updateStatus.bind(this)
              }
            ];
          });
          this.data = res.records;
          console.log("res.records", res.records);
          console.log("this.data", this.data);

          this.partnerList = new MatTableDataSource(res.records);
          this.paginator.length = res.totalCount;
          this.totalData = res.totalCount;
        }
      });
  }

  editPartner(row: PartnerDetail): void {
    this.router.navigate([`../${row._id}`], { relativeTo: this.route });
  }

  deletePartner(row: PartnerDetail): void {
    const config = {
      ...DEFAULT_MAT_DIALOG_CONFIG,
      minHeight: '200px'
    };
    this.dialogService.openGenerateCodeDialog(row, config).afterClosed().subscribe((res) => {
      if (res) {
        this.partnerService.deletePartnerDetail(row._id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.toasterService.displaySnackBarWithTranslation(
              'toasterMessage.updateStatusSuccessful', MessageType.success
            );
            const index = this.partnerList.data.findIndex((user) => user._id === row._id);
            this.partnerList.data.splice(index, 1);
            this.partnerList = new MatTableDataSource(this.partnerList.data);
            this.paginator.length = this.partnerList.data.length;
            this.totalData = this.partnerList.data.length;

          });
      }
    });
  }

  navigateToDeletePartner(): void {
    this.router.navigate(['../open-dialog'], { relativeTo: this.route });
  }

  updateStatus(row: PartnerDetail): void {
    this.partnerService.updatePartnerDetail({ isActive: !row.isActive }, row._id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toasterService.displaySnackBarWithTranslation(
          'toasterMessage.updateStatusSuccessful', MessageType.success
        );
        this.getPartnerList();
      });
  }

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

  navigateToAddPartner(): void {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }
}

export const columns = [
  {
    colName: 'Title',
    fieldName: 'title'
  },
  {
    colName: 'Name',
    fieldName: 'name'
  },
  {
    colName: 'Description',
    fieldName: 'description'
  }
];

export const data = [
  {
    title: 'Some Mock Title',
    name: 'Puppy',
    description: 'Some Mock Description',

  },
  {
    title: 'Some Mock Title',
    name: 'Vinyl Record',
    description: 'Some Mock Description',

  },
  {
    title: 'Some Mock Title',
    name: 'Watch',
    description: 'Some Mock Description',

  },
  {
    title: 'Some Mock Title',
    name: 'Clock',
    description: 'Some Mock Description',

  },
  {
    title: 'Some Mock Title',
    name: 'Leash',
    description: 'Some Mock Description',

  }, {
    title: 'Some Mock Title',
    name: 'Coffee Cup',
    description: 'Some Mock Description',

  }, {
    title: 'Some Mock Title',
    name: 'Bottle',
    description: 'Some Mock Description',
  },
  {
    title: 'Some Mock Title',
    name: 'Something else',
    description: 'Some Mock Description',
  }
  , {
    title: 'Some Mock Title',
    name: 'Vinyl Record',
    description: 'Some Mock Description',
  },
  {
    title: 'Some Mock Title',
    name: 'Vinyl Record',
    description: 'Some Mock Description',
  },
  {
    title: 'Some Mock Title',
    name: 'Vinyl Record',
    description: 'Some Mock Description',
  },
  {
    title: 'Some Mock Title',
    name: 'Vinyl Record',
    description: 'Some Mock Description',
  },
  {
    title: 'Some Mock Title',
    name: 'Vinyl Record',
    description: 'Some Mock Description',
  },
  {
    title: 'Some Mock Title',
    name: 'Vinyl Record',
    description: 'Some Mock Description',
  },
  {
    title: 'Some Mock Title',
    name: 'Vinyl Record',
    description: 'Some Mock Description',
  }
];

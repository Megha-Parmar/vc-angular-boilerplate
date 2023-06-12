import { EventEmitter, Injectable } from '@angular/core';
import { BreadCrumb, BreadcrumbEventModel } from '@models/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class CpEventsService {

  public cpHeaderDataChanged = new EventEmitter<BreadcrumbEventModel>();
  public toggleSidebar = new EventEmitter<boolean>();

  emitBreadcrumbsDetail(
    breadcrumbs: BreadCrumb[], showLastItemCustomLabel = false, lastItemCustomLabel?: string
  ): void {
    this.cpHeaderDataChanged.emit({
      breadcrumbs,
      ...showLastItemCustomLabel && { showLastItemCustomLabel },
      ...lastItemCustomLabel && { lastItemCustomLabel }
    });
  }
}

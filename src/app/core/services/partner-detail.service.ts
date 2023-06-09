import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { ErrorCode, MessageType } from '@constants/app.constants';
import { CreatePartner } from '@models/partner.model';
import { PartnerService } from '@services/partner.service';
import { Observable, catchError } from 'rxjs';
import { AlertToastrService } from './alert-toastr.service';

export const PartnerDetailService: ResolveFn<Observable<CreatePartner | unknown>> =
  (route: ActivatedRouteSnapshot) => {
    const partnerService = inject(PartnerService);
    const toasterService = inject(AlertToastrService);
    const router = inject(Router);

    return partnerService.getPartnerDetail(route.params.uuid)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === ErrorCode.badRequest) {
          toasterService.displaySnackBarWithTranslation('toasterMessage.invalidPartner', MessageType.error);
        }
        router.navigate(['/admin/partner']);
        return null;
      }));
  };

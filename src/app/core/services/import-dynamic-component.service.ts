import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportDynamicComponentService {
  constructor() { }

  public importDeleteStaffComp(): () => Promise<any> {
    return () =>
      import(
        '../../core/components/confirmation/confirmation.component'
      ).then((m) => m.ConfirmationComponent);
  }
  
  // public importDeleteStaffComp(): () => Promise<any> {
  //   return () =>
  //     import(
  //       '../../core/components/confirmation/discount-list.component'
  //     ).then((m) => m.DiscountstComponent);
  // }
}

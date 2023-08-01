import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImportDynamicComponentService {

  public importGenerateCodeComponent(): () => Promise<any> {
    return () => import('@cp-libs/generate-code/generate-code.component').then((m) => m.GenerateCodeComponent);
  }

}

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImportDynamicComponentService {
  constructor() {}

  public importGenerateCodeComponent(): () => Promise<any> {
    return () => import('@shared/cp-libs/generate-code/generate-code.component').then((m) => m.GenerateCodeComponent)
  }

}

import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ComponentLoader {
  loadChildren: () => Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentLoaderService {

  constructor() { }

  public loadComponentDynamically(vcr: ViewContainerRef, loadChildren: () => Promise<any>): Observable<ComponentRef<any>> {
    vcr.clear();
    return this.forChild(vcr, {
      loadChildren: loadChildren
    });
  }

  private forChild(vcr: ViewContainerRef, cl: ComponentLoader): Observable<ComponentRef<any>> {
    return from(cl.loadChildren()).pipe(
      map((component: any) => vcr.createComponent(component))
    );
  }
}

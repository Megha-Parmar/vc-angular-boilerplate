import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicDirective]',
  standalone: true,
})
export class DynamicComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

const LayoutMaterial = [
  MatToolbarModule,
];

@NgModule({
  imports: [LayoutMaterial],
  exports: [LayoutMaterial],
})
export class LayoutMaterialModule { }

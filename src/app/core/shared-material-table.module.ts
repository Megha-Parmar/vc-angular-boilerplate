import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

const SharedMaterialTable = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  imports: [SharedMaterialTable],
  exports: [SharedMaterialTable],
})
export class SharedMaterialTableModule { }

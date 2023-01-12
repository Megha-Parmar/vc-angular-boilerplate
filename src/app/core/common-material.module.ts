import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const CommonMaterial = [
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule
];

@NgModule({
  imports: [CommonMaterial],
  exports: [CommonMaterial],
})
export class CommonMaterialModule { }

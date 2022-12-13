import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const CommonMaterial = [
  MatInputModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  imports: [CommonMaterial],
  exports: [CommonMaterial],
})
export class CommonMaterialModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from 'ckeditor4-angular';
import { AdminCoreModule } from 'src/app/core/core.module';
import { BreadcrumbModule } from 'src/app/layouts/breadcrumb/breadcrumb.module';
import { DiscountAddRoutingModule } from './discount-add-routing.module';
import { DiscountAddComponent } from './discount-add.component';

@NgModule({
  declarations: [DiscountAddComponent],
  imports: [
    CommonModule,
    DiscountAddRoutingModule,
    AdminCoreModule,
    MatIconModule,
    BreadcrumbModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    CKEditorModule,
  ]
})
export class DiscountAddModule { }

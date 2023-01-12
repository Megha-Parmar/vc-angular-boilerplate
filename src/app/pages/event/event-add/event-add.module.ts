import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { CKEditorModule } from 'ckeditor4-angular';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AdminCoreModule } from 'src/app/core/core.module';
import { BreadcrumbModule } from 'src/app/layouts/breadcrumb/breadcrumb.module';
import { EventAddRoutingModule } from './event-add-routing.module';
import { EventAddComponent } from './event-add.component';


@NgModule({
  declarations: [EventAddComponent],
  imports: [
    CommonModule,
    EventAddRoutingModule,
    AdminCoreModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    MatButtonModule,
    MatNativeDateModule,
    MatInputModule,
    GooglePlaceModule,
    CKEditorModule,
    BreadcrumbModule
  ]
})
export class EventAddModule { }

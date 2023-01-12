import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatTimepickerModule } from 'mat-timepicker';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { CommonMaterialModule } from 'src/app/core/common-material.module';
import { AdminCoreModule } from 'src/app/core/core.module';
import { BreadcrumbModule } from 'src/app/layouts/breadcrumb/breadcrumb.module';
import { EventAddRoutingModule } from './event-add-routing.module';
import { EventAddComponent } from './event-add.component';
import { EventAvailabilityComponent } from './event-availability/event-availability.component';


@NgModule({
  declarations: [EventAddComponent, EventAvailabilityComponent],
  imports: [
    CommonModule,
    EventAddRoutingModule,
    AdminCoreModule,
    GooglePlaceModule,
    CKEditorModule,
    BreadcrumbModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    MatNativeDateModule,
    CommonMaterialModule,
    MatDatepickerModule,
    MatTimepickerModule
  ]
})
export class EventAddModule { }

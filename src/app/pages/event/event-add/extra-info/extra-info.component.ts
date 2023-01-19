import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from 'ckeditor4-angular';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { Constants, MessageConstant, messageType } from 'src/app/core/constants/app.constants';
import { EventListModel, EventTagsModel } from 'src/app/core/models/event.model';
import { APIResponse } from 'src/app/core/models/general.model';
import { EventService } from 'src/app/core/services/event.service';
import { PopupOpenService } from 'src/app/core/services/popup-open.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-extra-info',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ConfirmationComponent, CKEditorModule, MatTabsModule, FormsModule, MatAutocompleteModule,
    MatChipsModule, MatIconModule, MatButtonModule, TranslateModule],
  providers:[PopupOpenService],
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.scss']
})
export class ExtraInfoComponent implements OnInit, OnDestroy {
  event_tags: EventTagsModel[] = [];
  deletedTags: EventTagsModel[] = [];
  addOnBlur = true;
  terms_and_conditions!: string;
  formName: string = String('event_extrainfo');
  ckeConfig = Constants.CkEditorConfig
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @Input() eventInfo!: EventListModel;
  @Input() eventId!: string;
  @Input() selectedIndex!: number;
  unSubscriber: Subject<void> = new Subject();

  constructor(
    readonly eventService: EventService,
    private router: Router,
    private toaster: ToasterService,
    private popupService: PopupOpenService
  ) { }

  ngOnInit(): void {
    if (this.eventId) {
      this.setFormValue();
    }
  }

  setFormValue(): void {
    this.eventInfo?.event_tags?.forEach((element) => {
      this.event_tags.push({
        name: element.name,
        uuid: element.uuid,
        is_deleted: false,
      });
      this.terms_and_conditions = this.eventInfo.terms_and_conditions;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.event_tags.push({ name: value });
    }
    event.chipInput!.clear();
  }

  remove(tag: EventTagsModel): void {
    const index = this.event_tags.indexOf(tag);
    if (this.eventId && tag.uuid) {
      this.deletedTags.push({
        name: tag.name,
        uuid: tag.uuid,
        is_deleted: true,
      });
    }
    if (index >= 0) {
      this.event_tags.splice(index, 1);
    }
  }

  onSubmit(type: boolean): void {
    if (type === true && this.eventInfo.is_published === false) {
      const commonData = {
        detail: 'eventAddEditPage.publishConfirmation',
        // highLightedText: `${name} ?`,
        okText: 'Ok',
        cancelText: 'Cancel',
        type: 'inactivity'
      }
      const dialogRef = this.popupService.openPopup(ConfirmationComponent, commonData, '90%', true, {
        panelClass: 'custom-modal',
        maxWidth: '500px',
      });
      dialogRef.afterClosed().subscribe((resp: boolean) => {
        if (resp) {
          this.submitEvent(type)
        }
      });
    } else {
      this.submitEvent(type);
    }
  }

  submitEvent(type: boolean): void {
    const param = {
      extra_info: {
        event_tags: this.event_tags.concat(this.deletedTags),
        terms_and_conditions: this.terms_and_conditions,
      },
      published: type,
    };
    this.eventService
      .updateEvent(this.eventInfo.uuid, this.formName, param)
      .pipe(takeUntil(this.unSubscriber))
      .subscribe({
        next: (res: APIResponse<EventListModel>) => {
          if (res) {
            if (type === false) {
              this.toaster.displaySnackBar(MessageConstant.successMessage.eventsavedasDraftSuccessfully, messageType.success);
            } else {
              if (this.eventId) {
                this.toaster.displaySnackBar(MessageConstant.successMessage.eventUpdatedSuccessfully, messageType.success);
              } else {
                this.toaster.displaySnackBar(MessageConstant.successMessage.eventCreatedSuccessfully, messageType.success);
              }
            }
            this.router.navigate(['/event/list']);
          }
        }
      });
  }

  ngOnDestroy(): void {
    if (this.unSubscriber) {
      this.unSubscriber.complete();
      this.unSubscriber.next();
    }
  }
}

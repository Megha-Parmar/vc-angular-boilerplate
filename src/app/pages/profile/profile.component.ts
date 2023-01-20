import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs/internal/Subject';
import { BreadcrumbComponent } from 'src/app/layouts/breadcrumb/breadcrumb.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[CommonModule, BreadcrumbComponent, MatInputModule, MatSelectModule, FormsModule, TranslateModule, MatCheckboxModule, MatRadioModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  readonly baseUrl = environment.contentful.BASE_URL;
  readonly CDN_URL = environment.contentful.CDN_URL;
  private unSubscriber: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {

  }


  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}

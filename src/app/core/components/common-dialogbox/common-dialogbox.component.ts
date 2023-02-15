import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DynamicComponentDirective } from 'src/app/core/directives/dynamic-component.directive';
import { CommonDialogboxService } from 'src/app/core/services/common-dialogbox.service';
import { DynamicComponentLoaderService } from 'src/app/core/services/dynamic-component-loader.service';

export interface DialogData {
  loadComponent?: () => Promise<any>;
  title?: string;
  detail?: string;
  highLightedText?: string;
  okText?: string;
  cancelText?: string;
  type?: 'reject-tc' | 'inactivity';
}

@Component({
  selector: 'app-common-dialogbox',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatDialogModule, MatIconModule, DynamicComponentDirective],
  providers: [CommonDialogboxService],
  templateUrl: './common-dialogbox.component.html',
  styleUrls: ['./common-dialogbox.component.scss']
})
export class CommonDialogboxComponent implements OnInit, AfterViewInit {

  title: string;
  detail: string;
  highLightedText: string;
  okText: string;
  cancelText: string;
  type: string;

  @ViewChild(DynamicComponentDirective, {read: ViewContainerRef})
  dynamicDirective: ViewContainerRef;

  loadComponent: () => Promise<any>;
  compData: any;

  loadDynamicComponentSubscription!: Subscription;
  closeCommonDialogEventSubscription!: Subscription;

  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<CommonDialogboxComponent>,
    private dynamicComponentLoaderService: DynamicComponentLoaderService,
    private commonDialogboxService: CommonDialogboxService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    console.log(dialogData);
    this.title = dialogData.compData.title;
    this.detail = dialogData.compData.detail;
    this.highLightedText = dialogData.compData.highLightedText;
    this.okText = dialogData.compData.okText;
    this.cancelText = dialogData.compData.cancelText;
    this.type = dialogData.compData.type;
    this.loadComponent = dialogData.loadComponent;

    this.closeCommonDialogEventSubscription = this.commonDialogboxService.closeCommonDialogboxEvent.subscribe({
      next: (result: any) => {
        this.dialogRef.close(result);
      }
    })
  }

  ngOnInit(): void {
    console.log("this.dynamicDirective", this.dynamicDirective);
    // const viewContainerRef = this.dynamicDirective.viewContainerRef;
    // console.log('viewContainerRef', viewContainerRef);
    // this.loadDynamicComponentSubscription = this.dynamicComponentLoaderService.loadComponentDynamically(viewContainerRef, this.loadComponent)
    //   .subscribe({
    //     next: (result: ComponentRef<any>) => {
    //       console.log(result);
    //       result.instance.compData = this.compData;
    //     }
    //   });
  }

  ngAfterViewInit() {
    const viewContainerRef = this.dynamicDirective;
    console.log('viewContainerRef', viewContainerRef);
    this.loadDynamicComponentSubscription = this.dynamicComponentLoaderService.loadComponentDynamically(viewContainerRef, this.loadComponent)
      .subscribe({
        next: (result: ComponentRef<any>) => {
          console.log(result);
          result.instance.compData = this.compData;
        }
      });
  }

  close() {
    this.dialogRef.close();
  }

  // onConfirmation(): void {
  //   this.dialogRef.close(true);
  // }

  ngOnDestroy(): void {
    if (this.loadDynamicComponentSubscription) {
      this.loadDynamicComponentSubscription.unsubscribe();
    }
    if (this.closeCommonDialogEventSubscription) {
      this.closeCommonDialogEventSubscription.unsubscribe();
    }
  }
}

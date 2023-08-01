import { CommonModule } from '@angular/common';
import { Component, ComponentRef, DestroyRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicDirective } from '@app/core/directives/dynamic.directive';
import { DialogService } from '@app/core/services/dialog.service';
import { DynamicComponentLoaderService } from '@app/core/services/dynamic-component-loader.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cp-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, DynamicDirective],
  templateUrl: './cp-dialog.component.html',
  styleUrls: ['./cp-dialog.component.scss']
})
export class CpDialogComponent implements OnInit {

  title: string;
  customHeaderClass: string;

  @ViewChild(DynamicDirective, { static: true })
  dynamicDirective: DynamicDirective;

  loadComponent: () => Promise<any>;
  compData: any;

  private destroyRef = inject(DestroyRef);

  constructor(
    public translate: TranslateService,
    public dialogService: DialogService,
    public dialogRef: MatDialogRef<CpDialogComponent>,
    private dynamicComponentLoaderService: DynamicComponentLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: {
      loadComponent: () => Promise<any>;
      data: any;
      dialogTitle: string;
      showHeader: boolean;
      customHeaderClass: string;
    },
  ) {

    this.dialogService.closeDialogEvent.subscribe((data) => {
      // Handle the emitted event here
      this.dialogRef.close(data);

    });
    this.title = data.dialogTitle;
    this.customHeaderClass = data.customHeaderClass;
    this.loadComponent = data.loadComponent;
    this.compData = data.data;
  }

  ngOnInit(): void {
    const viewContainerRef = this.dynamicDirective.viewContainerRef;
    this.dynamicComponentLoaderService.loadComponentDynamically(
      viewContainerRef,
      this.loadComponent
    ).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: ComponentRef<any>) => {
          result.instance.compData = this.compData;
        }
      });
  }

  close() {
    this.dialogRef.close(false);
  }
}

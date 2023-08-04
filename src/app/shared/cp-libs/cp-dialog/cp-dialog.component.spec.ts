import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CpDialogComponent } from './cp-dialog.component';

describe('CpDialogComponent', () => {
  let component: CpDialogComponent;
  let fixture: ComponentFixture<CpDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

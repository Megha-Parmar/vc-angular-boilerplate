import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDialogboxComponent } from './common-dialogbox.component';

describe('CommonDialogboxComponent', () => {
  let component: CommonDialogboxComponent;
  let fixture: ComponentFixture<CommonDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDialogboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

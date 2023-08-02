import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpSvgIconComponent } from './cp-svg-icon.component';

describe('CpSvgIconComponent', () => {
  let component: CpSvgIconComponent;
  let fixture: ComponentFixture<CpSvgIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CpSvgIconComponent]
    });
    fixture = TestBed.createComponent(CpSvgIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

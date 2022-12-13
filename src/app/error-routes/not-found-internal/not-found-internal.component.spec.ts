import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundInternalComponent } from './not-found-internal.component';

describe('NotFoundInternalComponent', () => {
  let component: NotFoundInternalComponent;
  let fixture: ComponentFixture<NotFoundInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundInternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

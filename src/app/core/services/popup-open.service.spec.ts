import { TestBed } from '@angular/core/testing';

import { PopupOpenService } from './popup-open.service';

describe('PopupOpenService', () => {
  let service: PopupOpenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupOpenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

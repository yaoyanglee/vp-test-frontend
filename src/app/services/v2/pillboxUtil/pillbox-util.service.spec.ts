import { TestBed } from '@angular/core/testing';

import { PillboxUtilService } from './pillbox-util.service';

describe('PillboxUtilService', () => {
  let service: PillboxUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PillboxUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FormExtractorService } from './form-extractor.service';

describe('FormExtractorService', () => {
  let service: FormExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormExtractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

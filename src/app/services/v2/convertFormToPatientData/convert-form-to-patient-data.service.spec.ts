import { TestBed } from '@angular/core/testing';

import { ConvertFormToPatientDataService } from './convert-form-to-patient-data.service';

describe('ConvertFormToPatientDataService', () => {
  let service: ConvertFormToPatientDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertFormToPatientDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

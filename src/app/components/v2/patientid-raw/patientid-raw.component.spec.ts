import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientidRawComponent } from './patientid-raw.component';

describe('PatientidRawComponent', () => {
  let component: PatientidRawComponent;
  let fixture: ComponentFixture<PatientidRawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientidRawComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientidRawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

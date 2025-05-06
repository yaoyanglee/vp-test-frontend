import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoV2PatientComponent } from './demo-v2-patient.component';

describe('DemoV2PatientComponent', () => {
  let component: DemoV2PatientComponent;
  let fixture: ComponentFixture<DemoV2PatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoV2PatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoV2PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

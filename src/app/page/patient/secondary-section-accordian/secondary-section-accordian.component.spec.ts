import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondarySectionAccordianComponent } from './secondary-section-accordian.component';

describe('SecondarySectionAccordianComponent', () => {
  let component: SecondarySectionAccordianComponent;
  let fixture: ComponentFixture<SecondarySectionAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondarySectionAccordianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondarySectionAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

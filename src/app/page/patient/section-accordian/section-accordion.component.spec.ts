import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAccordionComponent } from './section-accordion.component';

describe('SectionAccordianComponent', () => {
  let component: SectionAccordionComponent;
  let fixture: ComponentFixture<SectionAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

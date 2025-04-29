import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDateGroupComponent } from './day-date-group.component';

describe('DayDateGroupComponent', () => {
  let component: DayDateGroupComponent;
  let fixture: ComponentFixture<DayDateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayDateGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayDateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

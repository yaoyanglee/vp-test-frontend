import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Schedule_tabComponent } from './schedule_tab.component';

describe('ScheduleComponent', () => {
  let component: Schedule_tabComponent;
  let fixture: ComponentFixture<Schedule_tabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Schedule_tabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Schedule_tabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

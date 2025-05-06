import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pillbox_tabComponent } from './pillbox_tab.component';

describe('ScheduleComponent', () => {
  let component: Pillbox_tabComponent;
  let fixture: ComponentFixture<Pillbox_tabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pillbox_tabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pillbox_tabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

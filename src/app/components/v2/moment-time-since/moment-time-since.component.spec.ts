import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentTimeSinceComponent } from './moment-time-since.component';

describe('MomentTimeSinceComponent', () => {
  let component: MomentTimeSinceComponent;
  let fixture: ComponentFixture<MomentTimeSinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MomentTimeSinceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MomentTimeSinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoV2DashboardComponent } from './demo-v2-dashboard.component';

describe('DemoV2DashboardComponent', () => {
  let component: DemoV2DashboardComponent;
  let fixture: ComponentFixture<DemoV2DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoV2DashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoV2DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

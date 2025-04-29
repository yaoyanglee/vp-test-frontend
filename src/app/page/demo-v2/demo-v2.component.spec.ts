import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoV2Component } from './demo-v2.component';

describe('Demov2Component', () => {
  let component: DemoV2Component;
  let fixture: ComponentFixture<DemoV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

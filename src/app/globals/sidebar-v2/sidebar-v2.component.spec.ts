import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarV2Component } from './sidebar-v2.component';

describe('SidebarComponent', () => {
  let component: SidebarV2Component;
  let fixture: ComponentFixture<SidebarV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

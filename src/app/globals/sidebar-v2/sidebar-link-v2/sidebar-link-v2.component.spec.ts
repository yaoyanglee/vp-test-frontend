import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLinkV2Component } from './sidebar-link-v2.component';

describe('LinkComponent', () => {
  let component: SidebarLinkV2Component;
  let fixture: ComponentFixture<SidebarLinkV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLinkV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarLinkV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

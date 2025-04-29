import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTableParentComponent } from './page-table-parent.component';

describe('PageTableParentComponent', () => {
  let component: PageTableParentComponent;
  let fixture: ComponentFixture<PageTableParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTableParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageTableParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

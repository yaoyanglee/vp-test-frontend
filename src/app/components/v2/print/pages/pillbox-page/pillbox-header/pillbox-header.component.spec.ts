import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillboxHeaderComponent } from './pillbox-header.component';

describe('PillboxHeaderComponent', () => {
  let component: PillboxHeaderComponent;
  let fixture: ComponentFixture<PillboxHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillboxHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PillboxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

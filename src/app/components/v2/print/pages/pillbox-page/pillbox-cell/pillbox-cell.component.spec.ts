import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillboxCellComponent } from './pillbox-cell.component';

describe('PillboxCellComponent', () => {
  let component: PillboxCellComponent;
  let fixture: ComponentFixture<PillboxCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillboxCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PillboxCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

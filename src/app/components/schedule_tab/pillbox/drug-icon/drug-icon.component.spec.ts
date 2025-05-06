import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugIconComponent } from './drug-icon.component';

describe('DrugIconComponent', () => {
  let component: DrugIconComponent;
  let fixture: ComponentFixture<DrugIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrugIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

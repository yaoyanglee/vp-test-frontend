import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugInfoCardComponent } from './drug-info-card.component';

describe('DrugInfoCardComponent', () => {
  let component: DrugInfoCardComponent;
  let fixture: ComponentFixture<DrugInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugInfoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrugInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

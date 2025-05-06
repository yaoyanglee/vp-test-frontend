import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillboxFieldComponent } from './pillbox-field.component';

describe('PillboxFieldComponent', () => {
  let component: PillboxFieldComponent;
  let fixture: ComponentFixture<PillboxFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillboxFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PillboxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

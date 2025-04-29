import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillboxComponent } from './pillbox.component';

describe('PillboxComponent', () => {
  let component: PillboxComponent;
  let fixture: ComponentFixture<PillboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PillboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

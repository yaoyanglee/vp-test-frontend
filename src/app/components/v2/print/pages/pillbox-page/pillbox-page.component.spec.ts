import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillboxPageComponent } from './pillbox-page.component';

describe('PillboxPageComponent', () => {
  let component: PillboxPageComponent;
  let fixture: ComponentFixture<PillboxPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillboxPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PillboxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

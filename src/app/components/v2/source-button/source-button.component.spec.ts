import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceButtonComponent } from './source-button.component';

describe('SourceButtonComponent', () => {
  let component: SourceButtonComponent;
  let fixture: ComponentFixture<SourceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SourceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

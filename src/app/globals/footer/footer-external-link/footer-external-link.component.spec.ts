import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterExternalLinkComponent } from './footer-external-link.component';

describe('FooterExternalLinkComponent', () => {
  let component: FooterExternalLinkComponent;
  let fixture: ComponentFixture<FooterExternalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterExternalLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterExternalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

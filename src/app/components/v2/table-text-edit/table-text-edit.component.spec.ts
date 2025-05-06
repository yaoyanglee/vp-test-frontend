import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTextEditComponent } from './table-text-edit.component';

describe('TableTextEditComponent', () => {
  let component: TableTextEditComponent;
  let fixture: ComponentFixture<TableTextEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTextEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTextEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

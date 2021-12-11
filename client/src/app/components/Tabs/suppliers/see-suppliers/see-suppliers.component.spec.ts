import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeSuppliersComponent } from './see-suppliers.component';

describe('SeeSuppliersComponent', () => {
  let component: SeeSuppliersComponent;
  let fixture: ComponentFixture<SeeSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeSuppliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdataSuppliersComponent } from './updata-suppliers.component';

describe('UpdataSuppliersComponent', () => {
  let component: UpdataSuppliersComponent;
  let fixture: ComponentFixture<UpdataSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdataSuppliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdataSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

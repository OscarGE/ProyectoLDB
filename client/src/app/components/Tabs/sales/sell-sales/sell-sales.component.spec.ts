import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellSalesComponent } from './sell-sales.component';

describe('SellSalesComponent', () => {
  let component: SellSalesComponent;
  let fixture: ComponentFixture<SellSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

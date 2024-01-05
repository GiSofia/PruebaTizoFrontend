import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListIdComponent } from './product-list-id.component';

describe('ProductListIdComponent', () => {
  let component: ProductListIdComponent;
  let fixture: ComponentFixture<ProductListIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

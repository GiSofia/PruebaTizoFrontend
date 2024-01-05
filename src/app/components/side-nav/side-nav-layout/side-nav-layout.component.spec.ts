import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavLayoutComponent } from './side-nav-layout.component';

describe('SideNavLayoutComponent', () => {
  let component: SideNavLayoutComponent;
  let fixture: ComponentFixture<SideNavLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

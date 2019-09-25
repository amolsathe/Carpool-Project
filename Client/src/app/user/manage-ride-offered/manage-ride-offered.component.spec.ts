import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRideOfferedComponent } from './manage-ride-offered.component';

describe('ManageRideOfferedComponent', () => {
  let component: ManageRideOfferedComponent;
  let fixture: ComponentFixture<ManageRideOfferedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRideOfferedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRideOfferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

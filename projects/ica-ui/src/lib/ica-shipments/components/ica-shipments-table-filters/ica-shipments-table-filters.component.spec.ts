/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IcaShipmentsTableFiltersComponent } from './ica-shipments-table-filters.component';

describe('IcaShipmentsTableFiltersComponent', () => {
  let component: IcaShipmentsTableFiltersComponent;
  let fixture: ComponentFixture<IcaShipmentsTableFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaShipmentsTableFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaShipmentsTableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

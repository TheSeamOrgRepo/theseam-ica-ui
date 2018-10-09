import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcaTableComponent } from './ica-table.component';

describe('IcaTableComponent', () => {
  let component: IcaTableComponent;
  let fixture: ComponentFixture<IcaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

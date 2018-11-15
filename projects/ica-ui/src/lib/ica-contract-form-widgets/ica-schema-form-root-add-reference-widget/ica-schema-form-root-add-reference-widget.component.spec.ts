import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcaSchemaFormRootAddReferenceWidgetComponent } from './ica-schema-form-root-add-reference-widget.component';

describe('IcaSchemaFormRootAddReferenceWidgetComponent', () => {
  let component: IcaSchemaFormRootAddReferenceWidgetComponent;
  let fixture: ComponentFixture<IcaSchemaFormRootAddReferenceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaSchemaFormRootAddReferenceWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaSchemaFormRootAddReferenceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

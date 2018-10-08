import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcaSchemaFormWizardBtnsWidgetComponent } from './ica-schema-form-wizard-btns-widget.component';

describe('IcaSchemaFormWizardBtnsWidgetComponent', () => {
  let component: IcaSchemaFormWizardBtnsWidgetComponent;
  let fixture: ComponentFixture<IcaSchemaFormWizardBtnsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaSchemaFormWizardBtnsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaSchemaFormWizardBtnsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

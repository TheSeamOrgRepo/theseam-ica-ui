import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaSchemaFormWizardWidgetComponent } from './ica-schema-form-wizard-widget.component'

describe('IcaSchemaFormWizardWidgetComponent', () => {
  let component: IcaSchemaFormWizardWidgetComponent
  let fixture: ComponentFixture<IcaSchemaFormWizardWidgetComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaSchemaFormWizardWidgetComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaSchemaFormWizardWidgetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

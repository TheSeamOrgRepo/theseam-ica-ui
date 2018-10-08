import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaSchemaFormCheckboxWidgetComponent } from './ica-schema-form-checkbox-widget.component'

describe('IcaSchemaFormCheckboxWidgetComponent', () => {
  let component: IcaSchemaFormCheckboxWidgetComponent
  let fixture: ComponentFixture<IcaSchemaFormCheckboxWidgetComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaSchemaFormCheckboxWidgetComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaSchemaFormCheckboxWidgetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

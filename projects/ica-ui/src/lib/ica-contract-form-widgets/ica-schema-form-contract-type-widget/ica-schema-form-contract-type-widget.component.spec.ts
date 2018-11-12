import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaSchemaFormContractTypeWidgetComponent } from './ica-schema-form-contract-type-widget.component'

describe('IcaSchemaFormContractTypeWidgetComponent', () => {
  let component: IcaSchemaFormContractTypeWidgetComponent
  let fixture: ComponentFixture<IcaSchemaFormContractTypeWidgetComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaSchemaFormContractTypeWidgetComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaSchemaFormContractTypeWidgetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

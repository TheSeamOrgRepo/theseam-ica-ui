import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaSchemaFormInputWidgetComponent } from './ica-schema-form-input-widget.component'

describe('IcaSchemaFormInputWidgetComponent', () => {
  let component: IcaSchemaFormInputWidgetComponent
  let fixture: ComponentFixture<IcaSchemaFormInputWidgetComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaSchemaFormInputWidgetComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaSchemaFormInputWidgetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

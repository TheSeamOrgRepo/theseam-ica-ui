import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaSchemaFormSelectInputWidgetComponent } from './ica-schema-form-select-input-widget.component'

describe('IcaSchemaFormSelectInputWidgetComponent', () => {
  let component: IcaSchemaFormSelectInputWidgetComponent
  let fixture: ComponentFixture<IcaSchemaFormSelectInputWidgetComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaSchemaFormSelectInputWidgetComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaSchemaFormSelectInputWidgetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

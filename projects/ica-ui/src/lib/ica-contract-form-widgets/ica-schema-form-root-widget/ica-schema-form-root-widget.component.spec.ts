import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaSchemaFormRootWidgetComponent } from './ica-schema-form-root-widget.component'

describe('IcaSchemaFormRootWidgetComponent', () => {
  let component: IcaSchemaFormRootWidgetComponent
  let fixture: ComponentFixture<IcaSchemaFormRootWidgetComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaSchemaFormRootWidgetComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaSchemaFormRootWidgetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaSchemaFormSignatureWidgetComponent } from './ica-schema-form-signature-widget.component'

describe('IcaSchemaFormSignatureWidgetComponent', () => {
  let component: IcaSchemaFormSignatureWidgetComponent
  let fixture: ComponentFixture<IcaSchemaFormSignatureWidgetComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaSchemaFormSignatureWidgetComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaSchemaFormSignatureWidgetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

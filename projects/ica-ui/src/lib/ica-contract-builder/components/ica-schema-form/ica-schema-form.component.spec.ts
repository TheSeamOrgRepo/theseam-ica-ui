import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaSchemaFormComponent } from './ica-schema-form.component'

describe('IcaSchemaFormComponent', () => {
  let component: IcaSchemaFormComponent
  let fixture: ComponentFixture<IcaSchemaFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaSchemaFormComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaSchemaFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaContractBuilderComponent } from './ica-contract-builder.component'

describe('IcaContractBuilderComponent', () => {
  let component: IcaContractBuilderComponent
  let fixture: ComponentFixture<IcaContractBuilderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaContractBuilderComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaContractBuilderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

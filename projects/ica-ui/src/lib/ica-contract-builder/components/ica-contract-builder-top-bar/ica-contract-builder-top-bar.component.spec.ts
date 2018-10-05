import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaContractBuilderTopBarComponent } from './ica-contract-builder-top-bar.component'

describe('IcaContractBuilderTopBarComponent', () => {
  let component: IcaContractBuilderTopBarComponent
  let fixture: ComponentFixture<IcaContractBuilderTopBarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaContractBuilderTopBarComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaContractBuilderTopBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

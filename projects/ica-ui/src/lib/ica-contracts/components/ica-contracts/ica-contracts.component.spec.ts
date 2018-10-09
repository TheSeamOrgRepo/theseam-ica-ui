import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaContractsComponent } from './ica-contracts.component'

describe('IcaContractsComponent', () => {
  let component: IcaContractsComponent
  let fixture: ComponentFixture<IcaContractsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaContractsComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaContractsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

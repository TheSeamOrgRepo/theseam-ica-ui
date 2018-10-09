import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaModalContractCompleteComponent } from './ica-modal-contract-complete.component'

describe('IcaModalContractCompleteComponent', () => {
  let component: IcaModalContractCompleteComponent
  let fixture: ComponentFixture<IcaModalContractCompleteComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaModalContractCompleteComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaModalContractCompleteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

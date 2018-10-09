import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaTableActionsDropdownComponent } from './ica-table-actions-dropdown.component'

describe('IcaTableActionsDropdownComponent', () => {
  let component: IcaTableActionsDropdownComponent
  let fixture: ComponentFixture<IcaTableActionsDropdownComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaTableActionsDropdownComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaTableActionsDropdownComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaContractsTableFiltersComponent } from './ica-contracts-table-filters.component'

describe('IcaContractsTableFiltersComponent', () => {
  let component: IcaContractsTableFiltersComponent
  let fixture: ComponentFixture<IcaContractsTableFiltersComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaContractsTableFiltersComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaContractsTableFiltersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

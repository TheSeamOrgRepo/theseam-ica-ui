import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaTablePaginationComponent } from './ica-table-pagination.component'

describe('IcaTablePaginationComponent', () => {
  let component: IcaTablePaginationComponent
  let fixture: ComponentFixture<IcaTablePaginationComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaTablePaginationComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaTablePaginationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

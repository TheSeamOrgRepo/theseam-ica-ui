/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { IcaDocumentsTableFiltersComponent } from './ica-documents-table-filters.component'

describe('IcaDocumentsTableFiltersComponent', () => {
  let component: IcaDocumentsTableFiltersComponent
  let fixture: ComponentFixture<IcaDocumentsTableFiltersComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaDocumentsTableFiltersComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaDocumentsTableFiltersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

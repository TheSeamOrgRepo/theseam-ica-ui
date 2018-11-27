import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { NgSelectModule } from '@ng-select/ng-select'

import { IcaTableModule } from '../../../ica-table/index'

import { IcaCompaniesTableFiltersComponent } from '../ica-companies-table-filters/ica-companies-table-filters.component'

import { IcaCompaniesComponent } from './ica-companies.component'

describe('IcaCompaniesComponent', () => {
  let component: IcaCompaniesComponent
  let fixture: ComponentFixture<IcaCompaniesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        IcaTableModule,
        NgSelectModule
      ],
      declarations: [
        IcaCompaniesComponent,
        IcaCompaniesTableFiltersComponent
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaCompaniesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

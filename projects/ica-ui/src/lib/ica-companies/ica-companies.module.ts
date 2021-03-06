import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { NgSelectModule } from '@ng-select/ng-select'

import { IcaTableModule } from '../ica-table/index'

import { IcaCompaniesComponent } from './components/ica-companies/ica-companies.component'
import { IcaCompaniesTableFiltersComponent } from './components/ica-companies-table-filters/ica-companies-table-filters.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IcaTableModule,
    NgSelectModule
  ],
  declarations: [
    IcaCompaniesComponent,
    IcaCompaniesTableFiltersComponent
  ],
  exports: [
    IcaCompaniesComponent,
    IcaCompaniesTableFiltersComponent
  ]
})
export class IcaCompaniesModule { }

import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { IcaTableModule } from '../ica-table'

import { IcaCompaniesComponent } from './components/ica-companies/ica-companies.component'
import { IcaCompaniesTableFiltersComponent } from './components/ica-companies-table-filters/ica-companies-table-filters.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IcaTableModule
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

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaTableModule } from '../ica-table'

import { IcaCompaniesComponent } from './components/ica-companies/ica-companies.component'

@NgModule({
  imports: [
    CommonModule,
    IcaTableModule
  ],
  declarations: [ IcaCompaniesComponent ],
  exports: [ IcaCompaniesComponent ]
})
export class IcaCompaniesModule { }

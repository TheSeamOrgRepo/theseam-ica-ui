import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaTableModule } from '../ica-table'

import { IcaContractsComponent } from './components/ica-contracts/ica-contracts.component'

@NgModule({
  imports: [
    CommonModule,
    IcaTableModule
  ],
  declarations: [ IcaContractsComponent ],
  exports: [ IcaContractsComponent ]
})
export class IcaContractsModule { }

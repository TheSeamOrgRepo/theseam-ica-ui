import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { IcaTableModule } from '../ica-table'

import { IcaContractsComponent } from './components/ica-contracts/ica-contracts.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IcaTableModule
  ],
  declarations: [ IcaContractsComponent ],
  exports: [ IcaContractsComponent ]
})
export class IcaContractsModule { }

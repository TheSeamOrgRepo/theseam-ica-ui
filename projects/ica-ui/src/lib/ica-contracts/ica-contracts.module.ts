import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { OverlayModule } from '@angular/cdk/overlay'

import { IcaModalFilePreviewModule } from './../ica-modal-file-preview/ica-modal-file-preview.module'

import { IcaTableModule } from '../ica-table'

import { IcaContractsComponent } from './components/ica-contracts/ica-contracts.component'
import { IcaContractsTableFiltersComponent } from './components/ica-contracts-table-filters/ica-contracts-table-filters.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IcaTableModule,
    IcaModalFilePreviewModule,
    OverlayModule
  ],
  declarations: [ IcaContractsComponent, IcaContractsTableFiltersComponent ],
  exports: [ IcaContractsComponent, IcaContractsTableFiltersComponent ]
})
export class IcaContractsModule { }

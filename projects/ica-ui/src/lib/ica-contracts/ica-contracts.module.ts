import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { OverlayModule } from '@angular/cdk/overlay'

import { NgSelectModule } from '@ng-select/ng-select'

import { IcaModalFilePreviewModule } from './../ica-modal-file-preview/ica-modal-file-preview.module'

import { IcaTableModule } from '../ica-table'

import { IcaContractsComponent } from './components/ica-contracts/ica-contracts.component'
import { IcaContractsTableFiltersComponent } from './components/ica-contracts-table-filters/ica-contracts-table-filters.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IcaTableModule,
    IcaModalFilePreviewModule,
    OverlayModule,
    NgSelectModule
  ],
  declarations: [ IcaContractsComponent, IcaContractsTableFiltersComponent ],
  exports: [ IcaContractsComponent, IcaContractsTableFiltersComponent ]
})
export class IcaContractsModule { }

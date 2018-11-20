import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { NgSelectModule } from '@ng-select/ng-select'

import { IcaTableModule } from '../ica-table/index'

import { IcaShipmentsComponent } from './components/ica-shipments/ica-shipments.component'
import { IcaShipmentsTableFiltersComponent } from './components/ica-shipments-table-filters/ica-shipments-table-filters.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IcaTableModule,
    NgSelectModule
  ],
  declarations: [
    IcaShipmentsComponent,
    IcaShipmentsTableFiltersComponent
  ],
  exports: [
    IcaShipmentsComponent,
    IcaShipmentsTableFiltersComponent
  ]
})
export class IcaShipmentsModule { }

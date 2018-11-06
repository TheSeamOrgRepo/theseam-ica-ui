import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { IcaTableModule } from '../ica-table'

import { IcaShipmentsComponent } from './components/ica-shipments/ica-shipments.component'
import { IcaShipmentsTableFiltersComponent } from './components/ica-shipments-table-filters/ica-shipments-table-filters.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IcaTableModule
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

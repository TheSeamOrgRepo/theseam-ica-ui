import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaTableModule } from '../ica-table'

import { IcaShipmentsComponent } from './components/ica-shipments/ica-shipments.component'

@NgModule({
  imports: [
    CommonModule,
    IcaTableModule
  ],
  declarations: [ IcaShipmentsComponent ],
  exports: [ IcaShipmentsComponent ]
})
export class IcaShipmentsModule { }

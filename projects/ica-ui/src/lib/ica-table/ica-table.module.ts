import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaTableComponent } from './components/ica-table/ica-table.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ IcaTableComponent ],
  exports: [ IcaTableComponent ]
})
export class IcaTableModule { }

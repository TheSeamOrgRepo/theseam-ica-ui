import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaTableComponent } from './components/ica-table/ica-table.component'
import { IcaTableActionsDropdownComponent } from './components/ica-table-actions-dropdown/ica-table-actions-dropdown.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ IcaTableComponent, IcaTableActionsDropdownComponent ],
  exports: [ IcaTableComponent, IcaTableActionsDropdownComponent ]
})
export class IcaTableModule { }

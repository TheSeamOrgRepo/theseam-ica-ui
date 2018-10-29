import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaCommonModule } from '../common'

import { IcaTableComponent } from './components/ica-table/ica-table.component'
import { IcaTableActionsDropdownComponent } from './components/ica-table-actions-dropdown/ica-table-actions-dropdown.component'
import { IcaTablePaginationComponent } from './components/ica-table-pagination/ica-table-pagination.component'

@NgModule({
  imports: [
    CommonModule,
    IcaCommonModule
  ],
  declarations: [ IcaTableComponent, IcaTableActionsDropdownComponent, IcaTablePaginationComponent ],
  exports: [ IcaTableComponent, IcaTableActionsDropdownComponent, IcaTablePaginationComponent ]
})
export class IcaTableModule { }

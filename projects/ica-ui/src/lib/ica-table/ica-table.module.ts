import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CdkTableModule } from '@angular/cdk/table'

import { IcaCommonModule } from '../common/index'

import { IcaTableComponent } from './components/ica-table/ica-table.component'
import { IcaTableActionsDropdownComponent } from './components/ica-table-actions-dropdown/ica-table-actions-dropdown.component'
import { IcaTablePaginationComponent } from './components/ica-table-pagination/ica-table-pagination.component'

@NgModule({
  imports: [
    CommonModule,
    IcaCommonModule,
    // CDK
    CdkTableModule
  ],
  declarations: [ IcaTableComponent, IcaTableActionsDropdownComponent, IcaTablePaginationComponent ],
  exports: [ IcaTableComponent, IcaTableActionsDropdownComponent, IcaTablePaginationComponent ]
})
export class IcaTableModule { }

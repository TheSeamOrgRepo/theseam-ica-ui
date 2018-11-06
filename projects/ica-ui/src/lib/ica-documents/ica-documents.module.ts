import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IcaTableModule } from '../ica-table'

import { IcaDocumentsComponent } from './components/ica-documents/ica-documents.component'
import { IcaDocumentsTableFiltersComponent } from './components/ica-documents-table-filters/ica-documents-table-filters.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IcaTableModule
  ],
  declarations: [
    IcaDocumentsComponent,
    IcaDocumentsTableFiltersComponent
  ],
  exports: [
    IcaDocumentsComponent,
    IcaDocumentsTableFiltersComponent
  ]
})
export class IcaDocumentsModule { }

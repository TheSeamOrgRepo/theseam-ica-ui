import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaTableModule } from '../ica-table'

import { IcaDocumentsComponent } from './components/ica-documents/ica-documents.component'

@NgModule({
  imports: [
    CommonModule,
    IcaTableModule
  ],
  declarations: [ IcaDocumentsComponent ],
  exports: [ IcaDocumentsComponent ]
})
export class IcaDocumentsModule { }

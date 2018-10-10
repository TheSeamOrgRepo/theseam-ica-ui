import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { IcaModalNewDocumentComponent } from './components/ica-modal-new-document/ica-modal-new-document.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ IcaModalNewDocumentComponent ],
  exports: [ IcaModalNewDocumentComponent ],
  entryComponents: [ IcaModalNewDocumentComponent ]
})
export class IcaModalNewDocumentModule { }

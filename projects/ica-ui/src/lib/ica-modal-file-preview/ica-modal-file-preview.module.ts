import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaModalFilePreviewComponent } from './components/ica-modal-file-preview/ica-modal-file-preview.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ IcaModalFilePreviewComponent ],
  exports: [ IcaModalFilePreviewComponent ]
})
export class IcaModalFilePreviewModule { }

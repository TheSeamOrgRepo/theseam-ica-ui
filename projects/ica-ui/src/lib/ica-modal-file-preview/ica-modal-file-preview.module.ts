import { OverlayModule } from '@angular/cdk/overlay'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NgxJsonViewerModule } from 'ngx-json-viewer'

import { IcaCommonModule } from './../common/ica-common.module'

import { IcaModalFilePreviewComponent } from './components/ica-modal-file-preview/ica-modal-file-preview.component'

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    IcaCommonModule,
    NgxJsonViewerModule
  ],
  declarations: [ IcaModalFilePreviewComponent ],
  exports: [ IcaModalFilePreviewComponent ],
  entryComponents: [ IcaModalFilePreviewComponent ]
})
export class IcaModalFilePreviewModule { }

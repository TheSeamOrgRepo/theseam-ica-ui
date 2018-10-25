import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { NoFrameworkModule, MaterialDesignFrameworkModule } from 'angular6-json-schema-form'

import { IcaCommonModule } from './../common/ica-common.module'

import { SanitizeHtmlPipe } from './pipes/sanitizeHtml.pipe'

import { IcaJsfExtraDirective } from './directives/ica-jsf-extra.directive'

import { IcaModalContractSignModule } from './../ica-modal-contract-sign/ica-modal-contract-sign.module'
import { IcaModalContractCompleteModule } from './../ica-modal-contract-complete/ica-modal-contract-complete.module'
import { IcaContractFormWidgetsModule } from './../ica-contract-form-widgets/ica-contract-form-widgets.module'

// tslint:disable:max-line-length
import { IcaContractSchemaFormComponent } from './components/ica-contract-schema-form/ica-contract-schema-form.component'
import { IcaContractPreviewComponent } from './components/ica-contract-preview/ica-contract-preview.component'
import { IcaContractBuilderTopBarComponent } from './components/ica-contract-builder-top-bar/ica-contract-builder-top-bar.component'
import { IcaContractBuilderComponent } from './components/ica-contract-builder/ica-contract-builder.component'
import { IcaContractPreviewHtmlComponent } from './components/ica-contract-preview-html/ica-contract-preview-html.component'
import { IcaContractPreviewPdfComponent } from './components/ica-contract-preview-pdf/ica-contract-preview-pdf.component'
import { IcaContractPreviewSymbolOverlayComponent } from './components/ica-contract-preview-symbol-overlay/ica-contract-preview-symbol-overlay.component'
// tslint:enable:max-line-length

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NoFrameworkModule,
    MaterialDesignFrameworkModule,

    IcaCommonModule,
    IcaContractFormWidgetsModule,
    IcaModalContractCompleteModule,
    IcaModalContractSignModule,
  ],
  declarations: [
    IcaContractSchemaFormComponent,
    IcaContractPreviewComponent,
    IcaContractBuilderTopBarComponent,
    IcaContractBuilderComponent,
    SanitizeHtmlPipe,
    IcaContractPreviewHtmlComponent,
    IcaContractPreviewPdfComponent,
    IcaContractPreviewSymbolOverlayComponent,
    IcaJsfExtraDirective
  ],
  exports: [
    IcaContractSchemaFormComponent,
    IcaContractPreviewComponent,
    IcaContractBuilderTopBarComponent,
    IcaContractBuilderComponent,
    IcaContractPreviewHtmlComponent,
    IcaContractPreviewPdfComponent,
    IcaContractPreviewSymbolOverlayComponent
  ]
})
export class IcaContractBuilderModule { }

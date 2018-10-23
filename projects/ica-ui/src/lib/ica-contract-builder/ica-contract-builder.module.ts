import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { NoFrameworkModule, MaterialDesignFrameworkModule } from 'angular6-json-schema-form'

import { SanitizeHtmlPipe } from './pipes/sanitizeHtml.pipe'

import { IcaCommonModule } from './../common/ica-common.module'

import { IcaModalContractSignModule } from './../ica-modal-contract-sign/ica-modal-contract-sign.module'
import { IcaModalContractCompleteModule } from './../ica-modal-contract-complete/ica-modal-contract-complete.module'
import { IcaContractFormWidgetsModule } from './../ica-contract-form-widgets/ica-contract-form-widgets.module'

import { IcaContractSchemaFormComponent } from './components/ica-contract-schema-form/ica-contract-schema-form.component'
import { IcaContractPreviewComponent } from './components/ica-contract-preview/ica-contract-preview.component'
import { IcaContractBuilderTopBarComponent } from './components/ica-contract-builder-top-bar/ica-contract-builder-top-bar.component'
import { IcaContractBuilderComponent } from './components/ica-contract-builder/ica-contract-builder.component'

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
    SanitizeHtmlPipe
  ],
  exports: [
    IcaContractSchemaFormComponent,
    IcaContractPreviewComponent,
    IcaContractBuilderTopBarComponent,
    IcaContractBuilderComponent
  ]
})
export class IcaContractBuilderModule { }

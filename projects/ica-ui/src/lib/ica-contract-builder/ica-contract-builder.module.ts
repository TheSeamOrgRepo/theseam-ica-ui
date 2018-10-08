import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { NoFrameworkModule, MaterialDesignFrameworkModule } from 'angular6-json-schema-form'

import { SanitizeHtmlPipe } from './pipes/sanitizeHtml.pipe'

import { IcaContractFormWidgetsModule } from './../ica-contract-form-widgets/ica-contract-form-widgets.module'

import { IcaSchemaFormComponent } from './components/ica-schema-form/ica-schema-form.component'
import { IcaContractPreviewComponent } from './components/ica-contract-preview/ica-contract-preview.component'
import { IcaContractBuilderTopBarComponent } from './components/ica-contract-builder-top-bar/ica-contract-builder-top-bar.component'
import { IcaContractBuilderComponent } from './components/ica-contract-builder/ica-contract-builder.component'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NoFrameworkModule,
    MaterialDesignFrameworkModule,
    IcaContractFormWidgetsModule
  ],
  declarations: [
    IcaSchemaFormComponent,
    IcaContractPreviewComponent,
    IcaContractBuilderTopBarComponent,
    IcaContractBuilderComponent,
    SanitizeHtmlPipe
  ],
  exports: [
    IcaSchemaFormComponent,
    IcaContractPreviewComponent,
    IcaContractBuilderTopBarComponent,
    IcaContractBuilderComponent
  ]
})
export class IcaContractBuilderModule { }

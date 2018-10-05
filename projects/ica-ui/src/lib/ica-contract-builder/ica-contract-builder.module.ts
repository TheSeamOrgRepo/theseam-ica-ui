import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaSchemaFormComponent } from './components/ica-schema-form/ica-schema-form.component'
import { IcaContractPreviewComponent } from './components/ica-contract-preview/ica-contract-preview.component'
import { IcaContractBuilderTopBarComponent } from './components/ica-contract-builder-top-bar/ica-contract-builder-top-bar.component'
import { IcaContractBuilderComponent } from './components/ica-contract-builder/ica-contract-builder.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IcaSchemaFormComponent,
    IcaContractPreviewComponent,
    IcaContractBuilderTopBarComponent,
    IcaContractBuilderComponent
  ],
  exports: [
    IcaSchemaFormComponent,
    IcaContractPreviewComponent,
    IcaContractBuilderTopBarComponent,
    IcaContractBuilderComponent
  ]
})
export class IcaContractBuilderModule { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NoFrameworkModule, MaterialDesignFrameworkModule } from 'angular6-json-schema-form'

import { IcaSchemaFormSectionWidgetComponent } from './ica-schema-form-section-widget/ica-schema-form-section-widget.component'
import { IcaSchemaFormSignatureWidgetComponent } from './ica-schema-form-signature-widget/ica-schema-form-signature-widget.component'
import { IcaSchemaFormSubmitWidgetComponent } from './ica-schema-form-submit-widget/ica-schema-form-submit-widget.component'
import { IcaSchemaFormInputWidgetComponent } from './ica-schema-form-input-widget/ica-schema-form-input-widget.component'
import { IcaSchemaFormNumberWidgetComponent } from './ica-schema-form-number-widget/ica-schema-form-number-widget.component'
import { IcaSchemaFormWizardWidgetComponent } from './ica-schema-form-wizard-widget/ica-schema-form-wizard-widget.component'
import { IcaSchemaFormCheckboxWidgetComponent } from './ica-schema-form-checkbox-widget/ica-schema-form-checkbox-widget.component'
import { IcaSchemaFormWizardBtnsWidgetComponent } from './ica-schema-form-wizard-btns-widget/ica-schema-form-wizard-btns-widget.component'

import { SelectWidgetDirective } from './directives/select-widget.directive'

const widgetComponents = [
  IcaSchemaFormSectionWidgetComponent,
  IcaSchemaFormSignatureWidgetComponent,
  IcaSchemaFormSubmitWidgetComponent,
  IcaSchemaFormInputWidgetComponent,
  IcaSchemaFormNumberWidgetComponent,
  IcaSchemaFormCheckboxWidgetComponent,
  IcaSchemaFormWizardWidgetComponent,
  IcaSchemaFormWizardBtnsWidgetComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignFrameworkModule,
    NoFrameworkModule
  ],
  exports: [ ...widgetComponents, SelectWidgetDirective ],
  entryComponents: [ ...widgetComponents ],
  declarations: [ ...widgetComponents, SelectWidgetDirective ]
})
export class IcaContractFormWidgetsModule { }
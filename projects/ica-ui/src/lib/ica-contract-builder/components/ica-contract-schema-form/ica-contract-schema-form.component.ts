import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { JsonSchemaFormComponent, JsonPointer } from 'angular6-json-schema-form'

import { IContractTemplatePack } from '../../models/ica-contract-builder.models'
import { IcaConstractSchemaFormService } from '../../services/ica-constract-schema-form.service'
import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'

// tslint:disable:max-line-length
import { IcaSchemaFormSectionWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-section-widget/ica-schema-form-section-widget.component'
// import { IcaSchemaFormSignatureWidgetComponent } from '../../../ica-schema-form-signature-widget/ica-schema-form-signature-widget.component'
import { IcaSchemaFormSubmitWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-submit-widget/ica-schema-form-submit-widget.component'
import { IcaSchemaFormInputWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-input-widget/ica-schema-form-input-widget.component'
import { IcaSchemaFormNumberWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-number-widget/ica-schema-form-number-widget.component'
import { IcaSchemaFormWizardWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-wizard-widget/ica-schema-form-wizard-widget.component'
import { IcaSchemaFormCheckboxWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-checkbox-widget/ica-schema-form-checkbox-widget.component'
import { IcaSchemaFormWizardBtnsWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-wizard-btns-widget/ica-schema-form-wizard-btns-widget.component'
// tslint:enable:max-line-length

@Component({
  selector: 'ica-contract-schema-form',
  templateUrl: './ica-contract-schema-form.component.html',
  providers: [ IcaConstractSchemaFormService ]
})
export class IcaContractSchemaFormComponent implements OnInit {

  @Input() contractTemplatePack: IContractTemplatePack

  @Output() dataChange = new EventEmitter<object>()

  @ViewChild(JsonSchemaFormComponent) schemaForm: JsonSchemaFormComponent

  public widgets = {
    // 'schema-form-signature': IcaSchemaFormSignatureWidgetComponent,
    'section': IcaSchemaFormSectionWidgetComponent,
    'submit': IcaSchemaFormSubmitWidgetComponent,
    'text': IcaSchemaFormInputWidgetComponent,
    'number': IcaSchemaFormNumberWidgetComponent,
    'checkbox': IcaSchemaFormCheckboxWidgetComponent,
    'wizard-panel': IcaSchemaFormWizardWidgetComponent,
    'wizard-btns': IcaSchemaFormWizardBtnsWidgetComponent
  }

  constructor(
    private icaCntForm: IcaConstractSchemaFormService,
    public icaCntBuilder: IcaContractBuilderService
  ) { }

  ngOnInit() {
  }

  public focusField(field: string) {
    const foundItem = this.findInLayout(field)
    if (foundItem._id) {
      const panelIndex = this.findPanelIndexContainingField(foundItem)
      this.icaCntForm.setActiveWizardPanel(panelIndex)
      setTimeout(() => {
        const elem: any = document.querySelector(`#control${foundItem._id}`)
        elem.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
        elem.focus()
      })
    }
  }

  public findInLayout(dataPointer: string) {
    let foundItem

    const _find = (obj: any) => {
      if (foundItem) { return }
      for (const item of obj) {
        if (item.dataPointer && item.dataPointer === dataPointer) {
          foundItem = item
        } else if (item.items) {
          _find(item.items)
        }
      }
    }

    _find(this.schemaForm.jsf.layout)

    return foundItem
  }

  public findPanelIndexContainingField(item: any) {
    for (let i = 1; i < 10; i++) {
      if (document.querySelector(`.panel-idx-${i} #control${item._id}`)) {
        return i
      }
    }
  }

  public schemaFormOnChange(event: any) {
    console.log('schemaFormOnChange', event)
    const value = JsonPointer.get(event, '/Contract/Terms/Quantity/ContractedUnits')
    console.log('~value', value)
    this.dataChange.emit(event)
  }

}

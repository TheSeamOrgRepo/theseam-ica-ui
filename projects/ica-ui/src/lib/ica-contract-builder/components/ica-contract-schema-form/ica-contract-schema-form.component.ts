import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { JsonSchemaFormComponent, JsonPointer } from 'angular6-json-schema-form'

import { ICA_CONTRACT_FORM_WIDGETS } from '../../../ica-contract-form-widgets/ica-contract-form-widgets.module'
import { IContractTemplatePack } from '../../models/ica-contract-builder.models'
import { IcaConstractSchemaFormService } from '../../services/ica-constract-schema-form.service'
import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'

@Component({
  selector: 'ica-contract-schema-form',
  templateUrl: './ica-contract-schema-form.component.html',
  providers: [ IcaConstractSchemaFormService ]
})
export class IcaContractSchemaFormComponent implements OnInit {

  @Input() contractTemplatePack: IContractTemplatePack

  @Output() dataChange = new EventEmitter<object>()

  @ViewChild(JsonSchemaFormComponent) schemaForm: JsonSchemaFormComponent

  public widgets = ICA_CONTRACT_FORM_WIDGETS

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

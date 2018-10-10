import { Component, OnInit, Input } from '@angular/core'
import { JsonSchemaFormService, isArray, buildTitleMap } from 'angular6-json-schema-form'
import { AbstractControl } from '@angular/forms'

import { IcaConstractSchemaFormService } from '../../ica-contract-builder/services/ica-constract-schema-form.service'

@Component({
  selector: 'ica-schema-form-select-input-widget',
  templateUrl: './ica-schema-form-select-input-widget.component.html',
  styleUrls: ['./ica-schema-form-select-input-widget.component.scss']
})
export class IcaSchemaFormSelectInputWidgetComponent implements OnInit {

  formControl: AbstractControl
  controlName: string
  controlValue: any
  controlDisabled = false
  boundControl = false
  options: any
  selectList: any[] = []
  isArray = isArray
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]

  constructor(
    private jsf: JsonSchemaFormService,
    private icaContractSchema: IcaConstractSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {}
    this.selectList = buildTitleMap(
      this.options.titleMap || this.options.enumNames,
      this.options.enum, !!this.options.required, !!this.options.flatList
    )
    console.log('options', this.options)
    console.log('selectList', this.selectList)
    if (this.options.isGeneralContractType) {
      this.selectList = [ { name: '', value: null }, ...this.selectList ]
    }
    this.jsf.initializeControl(this)
  }

  updateValue(event) {
    if (this.options.isGeneralContractType) {
      this.icaContractSchema.setContractType(event.target.value)
    }
    this.jsf.updateValue(this, event.target.value)
  }

}

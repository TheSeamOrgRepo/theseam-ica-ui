import { Component, OnInit, Input } from '@angular/core'
import { JsonSchemaFormService, isArray, buildTitleMap, getControl } from 'angular6-json-schema-form'
import { AbstractControl } from '@angular/forms'

import { IcaConstractSchemaFormService } from '../../ica-contract-builder/services/ica-constract-schema-form.service'


@Component({
  selector: 'ica-schema-form-contract-type-widget',
  templateUrl: './ica-schema-form-contract-type-widget.component.html',
  styleUrls: ['./ica-schema-form-contract-type-widget.component.scss']
})
export class IcaSchemaFormContractTypeWidgetComponent implements OnInit {

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
    // console.log('IcaSchemaFormSelectInputWidgetComponent', this)
    // console.log('options', this.options)
    // console.log('selectList', this.selectList)

    this.jsf.initializeControl(this)
  }

  updateValue(event) {
    this.icaContractSchema.setContractType(event.value)

    this.jsf.updateValue(this, event.value)
  }

}

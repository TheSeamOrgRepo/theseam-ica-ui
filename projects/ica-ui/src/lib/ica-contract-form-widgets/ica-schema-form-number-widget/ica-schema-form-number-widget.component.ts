import { AbstractControl } from '@angular/forms'
import { Component, Input, OnInit } from '@angular/core'
import { JsonSchemaFormService } from 'angular6-json-schema-form'

@Component({
  selector: 'ica-schema-form-number-widget',
  templateUrl: './ica-schema-form-number-widget.component.html'
})
export class IcaSchemaFormNumberWidgetComponent implements OnInit {

  formControl: AbstractControl
  controlName: string
  controlValue: any
  controlDisabled = false
  boundControl = false
  options: any
  allowNegative = true
  allowDecimal = true
  allowExponents = false
  lastValidNumber = ''
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {}
    this.jsf.initializeControl(this)
    if (this.layoutNode.dataType === 'integer') { this.allowDecimal = false }
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value)
  }

}

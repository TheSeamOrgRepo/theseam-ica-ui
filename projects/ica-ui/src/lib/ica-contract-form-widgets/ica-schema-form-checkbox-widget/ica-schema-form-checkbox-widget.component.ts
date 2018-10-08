import { AbstractControl } from '@angular/forms'
import { Component, Input, OnInit } from '@angular/core'
import { JsonSchemaFormService } from 'angular6-json-schema-form'

@Component({
  selector: 'ica-schema-form-checkbox-widget',
  templateUrl: './ica-schema-form-checkbox-widget.component.html'
})
export class IcaSchemaFormCheckboxWidgetComponent implements OnInit {

  formControl: AbstractControl
  controlName: string
  controlValue: any
  controlDisabled = false
  boundControl = false
  options: any
  trueValue: any = true
  falseValue: any = false
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {}
    this.jsf.initializeControl(this)
    if (this.controlValue === null || this.controlValue === undefined) {
      this.controlValue = this.options.title
    }
  }

  updateValue(event) {
    event.preventDefault()
    this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue)
  }

  get isChecked() {
    return this.jsf.getFormControlValue(this) === this.trueValue
  }

}

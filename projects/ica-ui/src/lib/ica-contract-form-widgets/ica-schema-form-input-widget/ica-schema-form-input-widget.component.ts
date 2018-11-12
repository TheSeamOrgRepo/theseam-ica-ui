import { AbstractControl } from '@angular/forms'
import { Component, Input, OnInit } from '@angular/core'
import { JsonSchemaFormService } from 'angular6-json-schema-form'

@Component({
  selector: 'ica-schema-form-input-widget',
  templateUrl: './ica-schema-form-input-widget.component.html'
})
export class IcaSchemaFormInputWidgetComponent implements OnInit {

  formControl: AbstractControl
  controlName: string
  controlValue: string
  controlDisabled = false
  boundControl = false
  options: any
  autoCompleteList: string[] = []
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {}
    this.jsf.initializeControl(this)
    // console.log('IcaSchemaFormInputWidgetComponent', this)
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value)
  }

}

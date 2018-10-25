import { Directive, OnInit, HostListener, Output, EventEmitter } from '@angular/core'
import { JsonSchemaFormComponent, getControl } from 'angular6-json-schema-form'

import { IIcaJsfRemainingStatus } from '../models/ica-contract-builder.models'

@Directive({
  selector: '[icaJsfExtra]'
})
export class IcaJsfExtraDirective implements OnInit {

  @Output() remainingStatus = new EventEmitter<IIcaJsfRemainingStatus>()

  @HostListener('isValid', ['$event']) onIsValid($event) {
    this.remainingStatus.emit(this.getRemainingFieldsStatus())
  }

  constructor(
    private schemaForm: JsonSchemaFormComponent
  ) { }

  ngOnInit() {
    this.remainingStatus.emit(this.getRemainingFieldsStatus())
  }

  public getRemainingFieldsStatus(): IIcaJsfRemainingStatus {
    const status = { remaining: 0, required: 0 }

    const _find = (obj: any) => {
      for (const item of obj) {
        if (item.options && item.options.required) {
          console.log('item', item)
          status.required++
          console.log('item.dataPointer', item.dataPointer, ' item.options.focusedOnPointer', item.options.focusedOnPointer)
          const pointer = item.dataPointer || item.options.focusedOnPointer
          console.log('pointer', pointer)
          // TODO: Try catch is here temporarily while fixing issue with non-schema form controls
          try {
            const control = getControl(this.schemaForm.jsf.formGroup, pointer)
            if (!control.valid) {
              status.remaining++
            }
          } catch (err) {

          }
        } else if (item.items) {
          _find(item.items)
        }
      }
    }

    console.log('this.schemaForm', this.schemaForm)
    _find(this.schemaForm.jsf.layout)

    return status
  }

}

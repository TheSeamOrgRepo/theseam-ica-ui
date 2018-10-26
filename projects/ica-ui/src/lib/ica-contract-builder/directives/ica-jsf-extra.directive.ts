import { Directive, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core'
import { JsonSchemaFormComponent, getControl } from 'angular6-json-schema-form'

import { IIcaJsfRemainingStatus } from '../models/ica-contract-builder.models'
import { IcaConstractSchemaFormService } from '../services/ica-constract-schema-form.service'

@Directive({
  selector: '[icaJsfExtra]'
})
export class IcaJsfExtraDirective implements OnInit {

  @Input()
  set focusFormField(field: string) { this.focusField(field) }

  @Output() remainingStatus = new EventEmitter<IIcaJsfRemainingStatus>()

  @HostListener('isValid', ['$event']) onIsValid($event) {
    this.remainingStatus.emit(this.getRemainingFieldsStatus())
  }

  constructor(
    public schemaForm: JsonSchemaFormComponent,
    public icaCntForm: IcaConstractSchemaFormService,
  ) { }

  ngOnInit() {
    this.remainingStatus.emit(this.getRemainingFieldsStatus())
  }

  public getRemainingFieldsStatus(): IIcaJsfRemainingStatus {
    console.log('getRemainingFieldsStatus Start')
    const status = { remaining: 0, required: 0 }

    const _find = (obj: any) => {
      for (const item of obj) {
        if (item.options && item.options.required) {
          // console.log('item', item)
          status.required++
          // console.log('item.dataPointer', item.dataPointer, ' item.options.focusedOnPointer', item.options.focusedOnPointer)
          const pointer = item.dataPointer || item.options.focusedOnPointer
          // console.log('pointer', pointer)
          // TODO: Try catch is here temporarily while fixing issue with non-schema form controls
          if (pointer.indexOf('/Widget/') === 0) { continue }
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

    // console.log('this.schemaForm', this.schemaForm)
    _find(this.schemaForm.jsf.layout)
    console.log('getRemainingFieldsStatus End')

    return status
  }

  public findInLayout(dataPointer: string) {
    let foundItem

    const _find = (obj: any) => {
      if (foundItem) { return }
      for (const item of obj) {
        if (item.options && item.options.focusedOnPointer && item.options.focusedOnPointer === dataPointer) {
          foundItem = item
        } else if (item.dataPointer && item.dataPointer === dataPointer) {
          foundItem = item
        } else if (item.items) {
          _find(item.items)
        }
      }
    }

    _find(this.schemaForm.jsf.layout)

    return foundItem
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

  public findPanelIndexContainingField(item: any) {
    for (let i = 1; i < 10; i++) {
      if (document.querySelector(`.panel-idx-${i} #control${item._id}`)) {
        return i
      }
    }
  }

}

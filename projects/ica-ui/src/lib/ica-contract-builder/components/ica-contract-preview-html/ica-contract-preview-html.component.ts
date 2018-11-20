import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { JsonPointer } from 'angular6-json-schema-form'

import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'
import { getTemplateJsonPointers, addTemplateHoverActions, setTemplateJsonPointerValue } from './../../utils/html-template-utils'

@Component({
  selector: 'ica-contract-preview-html',
  templateUrl: './ica-contract-preview-html.component.html',
  styleUrls: ['./ica-contract-preview-html.component.scss']
})
export class IcaContractPreviewHtmlComponent implements OnInit {

  private _content: string
  private _data: any

  public formattedContent = ''

  @Input()
  set content(val: string) { this._content = val; setTimeout(() => this.updatePreview()) }
  get content() { return this._content }

  @Input()
  set data(val: object) { this._data = val; setTimeout(() => this.updatePreview()) }
  get data() { return this._data }

  @Output() fieldClicked = new EventEmitter<string>()

  constructor(
    public icaCntBuilder: IcaContractBuilderService
  ) { }

  ngOnInit() {

  }

  previewClick(event: MouseEvent) {
    const isFocusable = (event.target as any).classList.contains('tpl-focusable')
    // console.log('isFocusable', isFocusable)
    if (!isFocusable) {
      return
    }
    // console.log(event)
    // console.log(event.target)
    let value: string = (event.target as any).innerHTML
    // console.log('value', value)

    if (value.indexOf('{=') !== 0) {
      value = (event.target as any).getAttribute('data-pointer')
      // console.log('value1', value)
    } else {
      value = value.substring(2, value.length - 1)
    }


    this.fieldClicked.emit(value)
  }

  public updatePreview() {
    // console.log('updatePreview')
    const val = this.content
    const res = getTemplateJsonPointers(val)
    // console.log('res', res)

    let newContent = addTemplateHoverActions(val, res)

    if (this.data) {
      // console.log('this.data', this.data)
      const dataMap = JsonPointer.dict(this.data)
      // console.log('dataMap', dataMap)
      for (const key of Object.keys(dataMap)) {
        // console.log('key', key, '  ', dataMap[key])
        newContent = setTemplateJsonPointerValue(newContent, key, dataMap[key])
      }
    }

    this.formattedContent = newContent
  }

}

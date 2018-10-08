import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'ica-contract-preview',
  templateUrl: './ica-contract-preview.component.html',
  styles: []
})
export class IcaContractPreviewComponent implements OnInit {

  @Input() content: string

  @Output() fieldClicked = new EventEmitter<string>()

  constructor() { }

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

    value = value.substring(2, value.length - 1)

    this.fieldClicked.emit(value)
  }

}

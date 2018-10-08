import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'ica-contract-preview',
  templateUrl: './ica-contract-preview.component.html',
  styles: []
})
export class IcaContractPreviewComponent implements OnInit {

  @Input() content: string

  constructor() { }

  ngOnInit() {
  }

}

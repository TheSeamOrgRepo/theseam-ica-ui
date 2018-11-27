import { Component, OnInit, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'ica-contract-builder-new',
  templateUrl: './ica-contract-builder-new.component.html',
  styleUrls: ['./ica-contract-builder-new.component.scss']
})
export class IcaContractBuilderNewComponent implements OnInit {

  @Output() startContractClicked = new EventEmitter<void>()

  viewInProgressOptions = [
    { label: 'Option One', value: 1 },
    { label: 'Option Two', value: 2 },
    { label: 'Option Three', value: 3 }
  ]

  constructor() { }

  ngOnInit() {
  }

  onClickStartContract() {
    this.startContractClicked.emit()
  }

}

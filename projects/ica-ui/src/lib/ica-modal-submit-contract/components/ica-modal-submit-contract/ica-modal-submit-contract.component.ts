import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core'

import { IcaModalSubmitContractService } from './../../services/ica-modal-submit-contract.service'

// TODO: Convert old progress dialog component to this non-bootstrap component

@Component({
  selector: 'ica-modal-submit-contract',
  templateUrl: './ica-modal-submit-contract.component.html',
  styleUrls: ['./ica-modal-submit-contract.component.scss']
})
export class IcaModalSubmitContractComponent implements OnInit {

  // @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
  //   if (event.keyCode === 27) {
  //       this.closeModal()
  //   }
  // }

  constructor(
    public icaModalSubmitContract: IcaModalSubmitContractService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.icaModalSubmitContract.close()
  }

  onClickFinish() {
    console.log('[IcaModalSubmitContractComponent] finish')
    this.icaModalSubmitContract.completeContract.emit()
    this.icaModalSubmitContract.close()
  }

}

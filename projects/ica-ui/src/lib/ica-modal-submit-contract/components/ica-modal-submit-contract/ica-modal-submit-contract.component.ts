import { Component, OnInit, HostListener, ViewChild, ElementRef, EventEmitter } from '@angular/core'

import { IcaModalSubmitContractService } from './../../services/ica-modal-submit-contract.service'

// TODO: Convert old progress dialog component to this non-bootstrap component

@Component({
  selector: 'ica-modal-submit-contract',
  templateUrl: './ica-modal-submit-contract.component.html',
  styleUrls: ['./ica-modal-submit-contract.component.scss']
})
export class IcaModalSubmitContractComponent implements OnInit {

  btnFinish = new EventEmitter<void>()

  constructor(
    public icaModalSubmitContract: IcaModalSubmitContractService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.icaModalSubmitContract.close()
  }

  onClickFinish() {
    this.icaModalSubmitContract.close()
    this.btnFinish.emit()
  }

}

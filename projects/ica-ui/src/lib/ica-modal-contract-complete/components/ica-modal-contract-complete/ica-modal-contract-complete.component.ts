import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core'

import { IcaModalContractCompleteService } from './../../services/ica-modal-contract-complete.service'
import { IcaModalContractSignService } from './../../../ica-modal-contract-sign/services/ica-modal-contract-sign.service'

@Component({
  selector: 'ica-modal-contract-complete',
  templateUrl: './ica-modal-contract-complete.component.html',
  styleUrls: ['./ica-modal-contract-complete.component.scss']
})
export class IcaModalContractCompleteComponent implements OnInit {

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
        this.closeModal()
    }
  }

  constructor(
    public icaModalContractComplete: IcaModalContractCompleteService,
    public icaModalContractSign: IcaModalContractSignService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.icaModalContractComplete.close()
  }

  onClickSign() {
    this.icaModalContractSign.open()
  }

}

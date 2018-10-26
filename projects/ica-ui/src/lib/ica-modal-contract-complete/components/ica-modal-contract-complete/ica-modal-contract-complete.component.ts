import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core'
import { Observable } from 'rxjs'

import { IcaModalContractCompleteService } from './../../services/ica-modal-contract-complete.service'
import { IcaModalContractSignService } from './../../../ica-modal-contract-sign/services/ica-modal-contract-sign.service'
import { IcaContractBuilderService } from '../../../ica-contract-builder/'

@Component({
  selector: 'ica-modal-contract-complete',
  templateUrl: './ica-modal-contract-complete.component.html',
  styleUrls: ['./ica-modal-contract-complete.component.scss']
})
export class IcaModalContractCompleteComponent implements OnInit {

  public hasSigned$: Observable<boolean>

  @Output() btnFinish = new EventEmitter<void>()

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
        this.closeModal()
    }
  }

  constructor(
    public icaCntBuilder: IcaContractBuilderService,
    public icaModalContractComplete: IcaModalContractCompleteService,
    public icaModalContractSign: IcaModalContractSignService
  ) {
    this.hasSigned$ = this.icaCntBuilder.hasSigned$
  }

  ngOnInit() {
  }

  closeModal() {
    this.icaModalContractComplete.close()
  }

  onClickSign() {
    this.icaModalContractSign.open()
  }

  onClickFinish() {
    this.closeModal()
    this.btnFinish.emit()
  }

}

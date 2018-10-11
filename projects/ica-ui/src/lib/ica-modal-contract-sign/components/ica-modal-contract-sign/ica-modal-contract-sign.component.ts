import { Component, OnInit, HostListener, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core'
import { SignaturePad } from 'angular2-signaturepad/signature-pad'

import { IcaModalSubmitContractService } from './../../../ica-modal-submit-contract/services/ica-modal-submit-contract.service'
import { IcaModalContractSignService } from './../../services/ica-modal-contract-sign.service'

@Component({
  selector: 'ica-modal-contract-sign',
  templateUrl: './ica-modal-contract-sign.component.html',
  styleUrls: ['./ica-modal-contract-sign.component.scss']
})
export class IcaModalContractSignComponent implements OnInit {

  options = {
    canvasWidth: 450,
    canvasHeight: 150
  }

  @Output() beginEvent = new EventEmitter<boolean>()
  @Output() endEvent = new EventEmitter<boolean>()

  @Output() cleared = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<string>()

  @ViewChild(SignaturePad) signaturePad: SignaturePad

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
        this.closeModal()
    }
  }

  constructor(
    public icaModalContractSign: IcaModalContractSignService,
    public icaModalSubmitContract: IcaModalSubmitContractService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.icaModalContractSign.close()
  }

  onClickSubmit() {
    console.log('[SignContract] submit')
    this.closeModal()
    this.icaModalSubmitContract.open()
  }


  /**
   * Triggered by szimek/signature_pad's onBegin event
   */
  public drawStart(event: boolean) {
    this.beginEvent.emit(event)
  }

  /**
   * Triggered by szimek/signature_pad's onEnd event
   */
  public drawComplete(event: boolean) {
    this.endEvent.emit(event)
  }

  /**
   * Triggered on clear button click
   */
  public onClearBtnClick(event: any) {
    this.signaturePad.clear()
    event.preventDefault()
    event.stopPropagation()
  }

  /**
   * Triggered on cancel button click
   */
  public onCancelBtnClick(event: any) {
    this.cancel.emit(event)
    event.preventDefault()
    event.stopPropagation()
  }

  /**
   * Triggered on submit button click
   */
  public onSubmitBtnClick(event: any) {
    this.submit.emit(this.signaturePad.toDataURL())
    this.icaModalContractSign.newSignature.emit(this.signaturePad.toDataURL())
    event.preventDefault()
    event.stopPropagation()
  }

}

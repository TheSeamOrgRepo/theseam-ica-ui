import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { Injectable, EventEmitter } from '@angular/core'
import { ComponentPortal } from '@angular/cdk/portal'

import { IcaModalSubmitContractComponent } from './../components/ica-modal-submit-contract/ica-modal-submit-contract.component'

@Injectable({
  providedIn: 'root'
})
export class IcaModalSubmitContractService {

  modalRef: OverlayRef

  compilingContractDataState = ''
  generatingPdfDocumentState = ''
  encryptingContractFilesState = ''
  postingContractToDatabaseState = ''
  postingContractToBlockchainState = ''

  submitContract = new EventEmitter<void>()
  completeContract = new EventEmitter<void>()

  constructor(
    private overlay: Overlay
  ) { }

  open() {
    console.log('[IcaModalSubmitContractService] open')
    this.submitContract.emit()

    // Returns an OverlayRef (which is a PortalHost)
    this.modalRef = this.overlay.create({
      hasBackdrop: false
    })

    // Create ComponentPortal that can be attached to a PortalHost
    const portal = new ComponentPortal(IcaModalSubmitContractComponent)

    // Attach ComponentPortal to PortalHost
    this.modalRef.attach(portal)
  }

  close() {
    this.modalRef.detach()
  }

}

import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { Injectable, ComponentRef } from '@angular/core'
import { ComponentPortal } from '@angular/cdk/portal'

import { IcaModalSubmitContractComponent } from './../components/ica-modal-submit-contract/ica-modal-submit-contract.component'

@Injectable({
  providedIn: 'root'
})
export class IcaModalSubmitContractService {

  modalRef: OverlayRef

  // These should be removed from here and be exposed somewhere more appropriate
  compilingContractDataState = ''
  generatingPdfDocumentState = ''
  encryptingContractFilesState = ''
  postingContractToDatabaseState = ''
  postingContractToBlockchainState = ''

  constructor(
    private overlay: Overlay
  ) { }

  public open(): ComponentRef<IcaModalSubmitContractComponent> {
    // Returns an OverlayRef (which is a PortalHost)
    this.modalRef = this.overlay.create({
      hasBackdrop: false
    })

    // Create ComponentPortal that can be attached to a PortalHost
    const portal = new ComponentPortal(IcaModalSubmitContractComponent)

    // Attach ComponentPortal to PortalHost
    const compRef = this.modalRef.attach(portal)

    return compRef
  }

  public close(): void {
    this.modalRef.detach()
  }

}

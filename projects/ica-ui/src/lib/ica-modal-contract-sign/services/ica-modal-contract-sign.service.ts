import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { Injectable, EventEmitter } from '@angular/core'
import { ComponentPortal } from '@angular/cdk/portal'

import { IcaModalContractSignComponent } from './../components/ica-modal-contract-sign/ica-modal-contract-sign.component'

@Injectable({
  providedIn: 'root'
})
export class IcaModalContractSignService {

  modalRef: OverlayRef

  newSignature = new EventEmitter<any>()

  constructor(
    private overlay: Overlay
  ) { }

  open() {
    // Returns an OverlayRef (which is a PortalHost)
    this.modalRef = this.overlay.create({
      hasBackdrop: false
    })

    // Create ComponentPortal that can be attached to a PortalHost
    const portal = new ComponentPortal(IcaModalContractSignComponent)

    // Attach ComponentPortal to PortalHost
    this.modalRef.attach(portal)
  }

  close() {
    this.modalRef.detach()
  }

}

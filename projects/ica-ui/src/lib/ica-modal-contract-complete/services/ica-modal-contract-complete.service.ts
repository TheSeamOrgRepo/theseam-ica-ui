import { IcaModalContractSignService } from './../../ica-modal-contract-sign/services/ica-modal-contract-sign.service'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { Injectable, EventEmitter } from '@angular/core'
import { ComponentPortal } from '@angular/cdk/portal'

import { IcaModalContractCompleteComponent } from './../components/ica-modal-contract-complete/ica-modal-contract-complete.component'


@Injectable({
  providedIn: 'root'
})
export class IcaModalContractCompleteService {

  modalRef: OverlayRef

  constructor(
    private overlay: Overlay,
    public icaModalContractSign: IcaModalContractSignService
  ) { }

  open() {
    // Returns an OverlayRef (which is a PortalHost)
    this.modalRef = this.overlay.create({
      hasBackdrop: false
    })

    // Create ComponentPortal that can be attached to a PortalHost
    const portal = new ComponentPortal(IcaModalContractCompleteComponent)

    // Attach ComponentPortal to PortalHost
    this.modalRef.attach(portal)
  }

  close() {
    this.modalRef.detach()
  }

}

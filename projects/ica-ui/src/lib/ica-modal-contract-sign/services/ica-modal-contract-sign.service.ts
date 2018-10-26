import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { Injectable, EventEmitter, ComponentRef } from '@angular/core'
import { ComponentPortal } from '@angular/cdk/portal'

import { IcaModalContractSignComponent } from './../components/ica-modal-contract-sign/ica-modal-contract-sign.component'

@Injectable({
  providedIn: 'root'
})
export class IcaModalContractSignService {

  public modalRef: OverlayRef

  public newSignature = new EventEmitter<string>()

  constructor(
    private overlay: Overlay
  ) { }

  public open(): ComponentRef<IcaModalContractSignComponent> {
    // Returns an OverlayRef (which is a PortalHost)
    this.modalRef = this.overlay.create({
      hasBackdrop: false
    })

    // Create ComponentPortal that can be attached to a PortalHost
    const portal = new ComponentPortal(IcaModalContractSignComponent)

    // Attach ComponentPortal to PortalHost
    const compRef = this.modalRef.attach(portal)

    compRef.instance.submit.subscribe(dataUrl => this.newSignature.emit(dataUrl))

    return compRef
  }

  public close(): void {
    this.modalRef.detach()
  }

}

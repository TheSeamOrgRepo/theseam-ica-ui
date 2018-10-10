import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { Injectable, EventEmitter } from '@angular/core'
import { ComponentPortal } from '@angular/cdk/portal'

import { IcaModalNewDocumentComponent } from './../components/ica-modal-new-document/ica-modal-new-document.component'

@Injectable({
  providedIn: 'root'
})
export class IcaModalNewDocumentService {

  modalRef: OverlayRef
  upload = new EventEmitter<any>()

  constructor(
    private overlay: Overlay
  ) { }

  open() {
    // Returns an OverlayRef (which is a PortalHost)
    this.modalRef = this.overlay.create({
      hasBackdrop: false
    })

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(IcaModalNewDocumentComponent)

    // Attach ComponentPortal to PortalHost
    this.modalRef.attach(filePreviewPortal)
  }

  close() {
    this.modalRef.detach()
  }

}

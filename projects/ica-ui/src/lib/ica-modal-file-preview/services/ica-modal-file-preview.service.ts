import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { Injectable } from '@angular/core'
import { ComponentPortal } from '@angular/cdk/portal'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

import { IcaModalFilePreviewComponent } from './../components/ica-modal-file-preview/ica-modal-file-preview.component'

@Injectable({
  providedIn: 'root'
})
export class IcaModalFilePreviewService {

  modalRef: OverlayRef

  public fileName: string
  // public url: SafeUrl
  public url: string
  public dataSrc: any
  public fileType: string

  constructor(
    private overlay: Overlay,
    private sanitizer: DomSanitizer
  ) { }

  open(fileName, src, fileType) {
    this.fileName = fileName
    // this.url = this.sanitizer.bypassSecurityTrustUrl(url)
    if (fileType === 'pdf') {
      this.url = src
    } else if (fileType === 'json') {
      this.dataSrc = src
    }
    this.fileType = fileType

    // Returns an OverlayRef (which is a PortalHost)
    this.modalRef = this.overlay.create({
      hasBackdrop: false
    })

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(IcaModalFilePreviewComponent)

    // Attach ComponentPortal to PortalHost
    this.modalRef.attach(filePreviewPortal)
  }

  close() {
    this.modalRef.detach()

    this.fileName = undefined
    this.url = undefined
    this.fileType = undefined
  }

}

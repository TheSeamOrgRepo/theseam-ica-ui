import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core'

import { IcaModalFilePreviewService } from './../../services/ica-modal-file-preview.service'

@Component({
  selector: 'ica-modal-file-preview',
  templateUrl: './ica-modal-file-preview.component.html',
  styleUrls: ['./ica-modal-file-preview.component.scss']
})
export class IcaModalFilePreviewComponent implements OnInit {

  private _fileIframe: ElementRef

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
        this.closeModal()
    }
  }

  @ViewChild('fileIframe')
  public set fileIframe(val: ElementRef) {
    this._fileIframe = val
    setTimeout(() => {
      if (this.icaModalFilePreview.fileType === 'pdf') {
        console.log('show', this.icaModalFilePreview.url)
        console.log(this.fileIframe.nativeElement)
        this.fileIframe.nativeElement.src = this.icaModalFilePreview.url
      }
    }, 100)
  }
  public get fileIframe() {
    return this._fileIframe
  }

  constructor(
    public icaModalFilePreview: IcaModalFilePreviewService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.icaModalFilePreview.close()
  }

}

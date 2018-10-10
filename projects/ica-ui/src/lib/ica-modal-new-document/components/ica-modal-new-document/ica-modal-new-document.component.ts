import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core'

import { IcaModalNewDocumentService } from './../../services/ica-modal-new-document.service'

@Component({
  selector: 'ica-modal-new-document',
  templateUrl: './ica-modal-new-document.component.html',
  styleUrls: ['./ica-modal-new-document.component.scss']
})
export class IcaModalNewDocumentComponent implements OnInit {

  public selectedFilename: string
  public selectedFile: any

  @ViewChild('filesInput') filesInput: ElementRef

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
        this.closeModal()
    }
  }

  constructor(
    public icaModalNewDocument: IcaModalNewDocumentService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.icaModalNewDocument.close()
  }

  onClickSave() {
    this.icaModalNewDocument.upload.emit(this.selectedFile)
  }

  public fileInputChange(event: any) {
    this.selectedFilename = event.target.files[0].name
    this.selectedFile = event.target.files[0]
  }

  public browseForDocument() {
    this.filesInput.nativeElement.click()
  }

  public onClickDelete() {
    this.selectedFilename = undefined
    this.selectedFile = undefined
  }

  public onClickClose() {
    this.icaModalNewDocument.close()
    this.selectedFilename = undefined
    this.selectedFile = undefined
  }

}

import { Component, OnInit } from '@angular/core'

import { IcaTableColumn, IcaModalNewDocumentService } from '@theseam/ica-ui'

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  public documentsTableColumns: IcaTableColumn[] = [
    { prop: 'file', name: 'File' },
    { prop: 'fldr', name: 'Reference' },
    { prop: 'auth', name: 'Author' },
    { prop: 'ownr', name: 'Owner' },
    { prop: 'date', name: 'Date' },
    { prop: 'size', name: 'Size' },
  ]

  public documentsTableRows = [
    {
      file: '501135-501132-171119.pdf',
      fldr: 'Contract 501135-501132-171119',
      auth: 'Mark Berry',
      ownr: 'Allenberg Cotton Co',
      date: '06/23/18 5:55 PM',
      size: '50 KB',
    },
    {
      file: '501135-501132-171119.json',
      fldr: 'Contract 501135-501132-171119',
      auth: 'Mark Berry',
      ownr: 'Allenberg Cotton Co',
      date: '06/23/18 5:55 PM',
      size: '876 Bytes',
    },
    {
      file: '501135-501132-171119.pdf',
      fldr: 'Contract 501135-501132-171119',
      auth: 'Mark Berry',
      ownr: 'Allenberg Cotton Co',
      date: '06/23/18 5:55 PM',
      size: '50 KB',
    },
    {
      file: '501135-501132-171119.pdf',
      fldr: 'Contract 501135-501132-171119',
      auth: 'Mark Berry',
      ownr: 'Allenberg Cotton Co',
      date: '06/23/18 5:55 PM',
      size: '600 Bytes',
    }
  ]

  constructor(
    public icaModalNewDocument: IcaModalNewDocumentService
  ) { }

  ngOnInit() {
  }

  onClickNewDocumentBtn() {
    this.icaModalNewDocument.open()
  }

}

import { Component, OnInit } from '@angular/core'

import { IcaTableHeaderColumnItem, IcaTableRowColumnItem, IcaModalNewDocumentService } from '@theseam/ica-ui'

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  public documentsTableColumns: IcaTableHeaderColumnItem[] = [
    { name: 'file', label: 'File' },
    { name: 'fldr', label: 'Folder' },
    { name: 'auth', label: 'Author' },
    { name: 'ownr', label: 'Owner' },
    { name: 'date', label: 'Date' },
    { name: 'size', label: 'Size' },
    { name: 'secStat', label: 'Security Status' },
    { name: 'shrg', label: 'Sharing' },
    { name: 'fng', label: 'Fingerprint' },
  ]

  public documentsTableRows: Array<IcaTableRowColumnItem[]> = [
    [
      { name: 'file', label: '501135-501132-171119.pdf' },
      { name: 'fldr', label: 'Contract 501135-501132-171119' },
      { name: 'auth', label: 'Mark Berry' },
      { name: 'ownr', label: 'Allenberg Cotton Co' },
      { name: 'date', label: '06/23/18 5:55 PM' },
      { name: 'size', label: '50 KB' },
      { name: 'secStat', label: 'Encrypted' },
      { name: 'shrg', label: '' },
      { name: 'fng', label: 'QdgrRshGS44sFSh6782Sfs' },
    ],
    [
      { name: 'file', label: '501135-501132-171119.json' },
      { name: 'fldr', label: 'Contract 501135-501132-171119' },
      { name: 'auth', label: 'Mark Berry' },
      { name: 'ownr', label: 'Allenberg Cotton Co' },
      { name: 'date', label: '06/23/18 5:55 PM' },
      { name: 'size', label: '876 Bytes' },
      { name: 'secStat', label: 'Encrypted' },
      { name: 'shrg', label: '' },
      { name: 'fng', label: 'QdgrRshGS44sFSh6782Sfs' },
    ],
    [
      { name: 'file', label: '501135-501132-171119.pdf' },
      { name: 'fldr', label: 'Contract 501135-501132-171119' },
      { name: 'auth', label: 'Mark Berry' },
      { name: 'ownr', label: 'Allenberg Cotton Co' },
      { name: 'date', label: '06/23/18 5:55 PM' },
      { name: 'size', label: '50 KB' },
      { name: 'secStat', label: 'Encrypted' },
      { name: 'shrg', label: 'Yes' },
      { name: 'fng', label: 'QdgrRshGS44sFSh6782Sfs' },
    ],
    [
      { name: 'file', label: '501135-501132-171119.pdf' },
      { name: 'fldr', label: 'Contract 501135-501132-171119' },
      { name: 'auth', label: 'Mark Berry' },
      { name: 'ownr', label: 'Allenberg Cotton Co' },
      { name: 'date', label: '06/23/18 5:55 PM' },
      { name: 'size', label: '600 Bytes' },
      { name: 'secStat', label: 'Encrypted' },
      { name: 'shrg', label: 'Yes' },
      { name: 'fng', label: 'QdgrRshGS44sFSh6782Sfs' },
    ]
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

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

import { IRowAction } from './../../../ica-table/components/ica-table/ica-table.component'

@Component({
  selector: 'ica-documents',
  templateUrl: './ica-documents.component.html',
  styleUrls: ['./ica-documents.component.scss']
})
export class IcaDocumentsComponent implements OnInit {

  @Input() documentsTableColumns
  @Input() documentsTableRows

  @Output() clickNewDocumentBtn = new EventEmitter<void>()
  @Output() rowAction = new EventEmitter<IRowAction>()

  constructor() { }

  ngOnInit() {
  }

  onClickNewDoc() {
    this.clickNewDocumentBtn.emit()
  }

  onRowAction(rowAction: IRowAction) {
    this.rowAction.emit(rowAction)
  }

}

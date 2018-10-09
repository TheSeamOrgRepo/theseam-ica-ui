import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'ica-documents',
  templateUrl: './ica-documents.component.html',
  styleUrls: ['./ica-documents.component.scss']
})
export class IcaDocumentsComponent implements OnInit {

  @Input() documentsTableColumns
  @Input() documentsTableRows

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { IRowAction } from './../../../ica-table/components/ica-table/ica-table.component'

@Component({
  selector: 'ica-companies',
  templateUrl: './ica-companies.component.html',
  styleUrls: ['./ica-companies.component.scss']
})
export class IcaCompaniesComponent implements OnInit {

  @Input() companiesTableColumns
  @Input() companiesTableRows

  @Output() rowAction = new EventEmitter<IRowAction>()

  constructor() { }

  ngOnInit() {
  }

  onRowAction(rowAction: IRowAction) {
    this.rowAction.emit(rowAction)
  }

}

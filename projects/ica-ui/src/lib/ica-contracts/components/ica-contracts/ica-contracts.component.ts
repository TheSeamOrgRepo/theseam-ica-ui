import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { IRowAction } from './../../../ica-table/components/ica-table/ica-table.component'

@Component({
  selector: 'ica-contracts',
  templateUrl: './ica-contracts.component.html',
  styleUrls: ['./ica-contracts.component.scss']
})
export class IcaContractsComponent implements OnInit {

  @Input() contractsTableColumns
  @Input() contractsTableRows

  @Output() rowAction = new EventEmitter<IRowAction>()

  constructor() { }

  ngOnInit() {
  }

  onRowAction(rowAction: IRowAction) {
    this.rowAction.emit(rowAction)
  }



}

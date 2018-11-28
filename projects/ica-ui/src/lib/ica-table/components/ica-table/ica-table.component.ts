import { IcaTablePaginationComponent } from './../ica-table-pagination/ica-table-pagination.component'
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core'
import { DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, Observable } from 'rxjs'

import { IcaTableColumn } from '../../ica-table.models'

export interface IRowAction {
  action: string
  row: object
}

@Component({
  selector: 'ica-table',
  templateUrl: './ica-table.component.html',
  styleUrls: ['./ica-table.component.scss']
})
export class IcaTableComponent implements OnInit {

  @Input() columns: IcaTableColumn[]
  @Input() rows: any

  @Input() tableCssClasses: string
  @Input() hasActions = false
  @Input() hasCheckboxes = false

  @Output() rowAction = new EventEmitter<IRowAction>()

  constructor() { }

  ngOnInit() {
  }

  onRowAction(row, event) {
    this.rowAction.emit({ action: event, row })
  }

  getRowColCss(row: any, col: IcaTableColumn) {

  }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

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

  @Input() columns: string
  @Input() rows: string

  @Input() tableCssClasses: string
  @Input() hasActions = false

  @Output() rowAction = new EventEmitter<IRowAction>()

  constructor() { }

  ngOnInit() {
  }

  onRowAction(row, event) {
    this.rowAction.emit({ action: event, row })
  }

}

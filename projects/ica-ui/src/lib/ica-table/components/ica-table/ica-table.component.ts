import { IcaTablePaginationComponent } from './../ica-table-pagination/ica-table-pagination.component'
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core'
import { DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, Observable } from 'rxjs'

import { IcaTableRowColumnItem } from '../../ica-table.models'

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

  public displayedColumns = []
  public columnNames = {}

  // dataSource = new ExampleDataSource()
  // rowsData$ = this.dataSource.connect()

  @Input() columns: any
  // @Input() rows: any
  @Input()
  get rows() { return this._rows }
  set rows(value: any) {
    this._rows = value
    // this.updateDataSource()
  }
  private _rows

  @Input() tableCssClasses: string
  @Input() hasActions = false
  @Input() hasCheckboxes = false
  // @Input()
  // get paginator() { return this.dataSource.paginator }
  // set paginator(value: IcaTablePaginationComponent) { this.dataSource.paginator = value }

  @Output() rowAction = new EventEmitter<IRowAction>()



  constructor() { }

  ngOnInit() {
  }

  // updateDataSource() {
  //   const tmpCols = []
  //   const tmpColNames = {}
  //   for (const col of this.columns) {
  //     tmpCols.push(col.name)
  //     tmpColNames[col.name] = col.label
  //   }
  //   console.log('tmpCols', tmpCols)
  //   this.columnNames = tmpColNames
  //   this.displayedColumns = tmpCols

  //   console.log('updateDataSource')
  //   const tmpRows = []
  //   for (const row of this.rows) {
  //     console.log('row', row)
  //     const tmpRow = {}
  //     for (const rowCol of row) {
  //       tmpRow[rowCol.name] = { label: rowCol.label }
  //       if (rowCol.cssClass) {
  //         tmpRow[rowCol.name].cssClass = rowCol.cssClass
  //       }
  //     }
  //     console.log('tmpRow', tmpRow)
  //     tmpRows.push(tmpRow)
  //   }
  //   console.log('tmpRows', tmpRows)
  //   this.dataSource.data = tmpRows
  // }

  onRowAction(row, event) {
    this.rowAction.emit({ action: event, row })
  }

}

// export class ExampleDataSource extends DataSource<any> {
//   /** Stream of data that is provided to the table. */
//   private _data = new BehaviorSubject<any[]>([])

//   get data() { return this._data.value }
//   set data(value: any) { this._data.next(value) }

//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<any[]> {
//     return this._data
//   }

//   disconnect() {}
// }

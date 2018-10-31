import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core'
import { untilDestroyed } from 'ngx-take-until-destroy'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { IcaContractsTableFiltersComponent } from './../ica-contracts-table-filters/ica-contracts-table-filters.component'
import { IcaTablePaginationComponent } from './../../../ica-table/components/ica-table-pagination/ica-table-pagination.component'
import { IRowAction } from './../../../ica-table/components/ica-table/ica-table.component'

@Component({
  selector: 'ica-contracts',
  templateUrl: './ica-contracts.component.html',
  styleUrls: ['./ica-contracts.component.scss']
})
export class IcaContractsComponent implements OnInit, OnDestroy {

  private _contractsTableRows = new BehaviorSubject<any[]>([])
  public contractsTableRows$: Observable<any[]>

  public dataLength$: Observable<number>

  @Input() contractsTableColumns
  @Input()
  get contractsTableRows() { return this._contractsTableRows.value }
  set contractsTableRows(value: any[]) { this._contractsTableRows.next(value) }

  @Output() rowAction = new EventEmitter<IRowAction>()

  @ViewChild(IcaTablePaginationComponent) paginator: IcaTablePaginationComponent
  @ViewChild(IcaContractsTableFiltersComponent) tableFilters: IcaContractsTableFiltersComponent

  constructor() { }

  ngOnInit() {
    this.paginator.page
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        this.contractsTableRows = [ ...this.contractsTableRows ]
      })

    this.tableFilters.textFilter$
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        this.contractsTableRows = [ ...this.contractsTableRows ]
      })

    const rows$ = this._contractsTableRows.asObservable().pipe(
      map(data => {
        console.log('data', data)
        console.log('tf2', this.tableFilters.textFilter)
        const textFilter = this.tableFilters.textFilter
        if (textFilter && textFilter.trim().length > 0) {
          const filteredData = []
          for (const row of data) {
            let found = false
            for (const item of row) {
              if (`${item.label}`.toLowerCase().indexOf(textFilter) !== -1) {
                found = true
              }
            }
            if (found) {
              filteredData.push(row)
            }
          }
          return filteredData
        }
        return data
      })
    )

    this.contractsTableRows$ = rows$.pipe(
      map(data => {
        if (!this.paginator) { return data }

        const startIndex = this.paginator.pageIndex * this.paginator.pageSize
        return data.slice().splice(startIndex, this.paginator.pageSize)
      })
    )

    this.dataLength$ = rows$.pipe(map(data => (data) ? data.length : 0))
  }

  ngOnDestroy() {

  }

  onRowAction(rowAction: IRowAction) {
    this.rowAction.emit(rowAction)
  }

}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core'
import { untilDestroyed } from 'ngx-take-until-destroy'
import { BehaviorSubject, Observable, of, from } from 'rxjs'
import { map, switchMap, toArray } from 'rxjs/operators'

import { IcaTablePaginationComponent, IRowAction, icaTableTextFilter, IcaTableColumn } from './../../../ica-table/index'

import { IcaContractsTableFiltersComponent } from './../ica-contracts-table-filters/ica-contracts-table-filters.component'

@Component({
  selector: 'ica-contracts',
  templateUrl: './ica-contracts.component.html',
  styleUrls: ['./ica-contracts.component.scss']
})
export class IcaContractsComponent implements OnInit, OnDestroy {

  public dataLength$: Observable<number>

  @Input()
  get contractsTableColumns() { return this._contractsTableColumns.value }
  set contractsTableColumns(value: IcaTableColumn[]) { this._contractsTableColumns.next(value) }
  private _contractsTableColumns = new BehaviorSubject<IcaTableColumn[]>([])
  public contractsTableColumns$: Observable<IcaTableColumn[]>

  @Input()
  get contractsTableRows() { return this._contractsTableRows.value }
  set contractsTableRows(value: any[]) { this._contractsTableRows.next(value) }
  private _contractsTableRows = new BehaviorSubject<any[]>([])
  public contractsTableRows$: Observable<any[]>

  @Output() rowAction = new EventEmitter<IRowAction>()

  @ViewChild(IcaTablePaginationComponent) paginator: IcaTablePaginationComponent
  @ViewChild(IcaContractsTableFiltersComponent) tableFilters: IcaContractsTableFiltersComponent

  constructor() { }

  ngOnInit() {
    this.paginator.page
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        if (this.contractsTableRows) { this.contractsTableRows = [ ...this.contractsTableRows ] }
      })

    this.contractsTableColumns$ = this._contractsTableColumns.asObservable()

    const columnProps$ = this.contractsTableColumns$
      .pipe(switchMap(cols => from(cols).pipe(map(c => c.prop), toArray())))

    const typeFilter$ = this.tableFilters.typeFilter$.pipe(map(v => (v === 'all') ? undefined : v))
    const statusFilter$ = this.tableFilters.statusFilter$.pipe(map(v => (v === 'all') ? undefined : v))
    const textFilter$ = this.tableFilters.textFilter$

    const rows$ = this._contractsTableRows.asObservable().pipe(
      icaTableTextFilter(typeFilter$, of(['typ'])),
      icaTableTextFilter(statusFilter$, of(['stat'])),
      icaTableTextFilter(textFilter$, columnProps$),
    )

    this.contractsTableRows$ = rows$.pipe(
      map(data => {
        if (!data) { return data }
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

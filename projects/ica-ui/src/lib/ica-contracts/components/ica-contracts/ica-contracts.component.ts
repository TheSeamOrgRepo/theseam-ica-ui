import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core'
import { untilDestroyed } from 'ngx-take-until-destroy'
import { BehaviorSubject, Observable, from } from 'rxjs'
import { map, switchMap, toArray, tap } from 'rxjs/operators'

import { IcaContractsTableFiltersComponent } from './../ica-contracts-table-filters/ica-contracts-table-filters.component'
import { IcaTablePaginationComponent } from './../../../ica-table/components/ica-table-pagination/ica-table-pagination.component'
import { IRowAction } from './../../../ica-table/components/ica-table/ica-table.component'
import { tableTextFilter, icaTableTextFilter } from '../../../ica-table/utils/index'

@Component({
  selector: 'ica-contracts',
  templateUrl: './ica-contracts.component.html',
  styleUrls: ['./ica-contracts.component.scss']
})
export class IcaContractsComponent implements OnInit, OnDestroy {

  public dataLength$: Observable<number>

  @Input() contractsTableColumns

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

    this.tableFilters.textFilter$
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        if (this.contractsTableRows) { this.contractsTableRows = [ ...this.contractsTableRows ] }
      })

    this.tableFilters.typeFilter$
      .pipe(untilDestroyed(this))
      .subscribe(type => {
        if (this.contractsTableRows) { this.contractsTableRows = [ ...this.contractsTableRows ] }
      })

    // const rows$ = this._contractsTableRows.asObservable().pipe(
    //   tap(console.log),
    //   switchMap(rows => from(rows).pipe(
    //     // map(data => {
    //     //   if (this.tableFilters.typeFilter && this.tableFilters.typeFilter !== 'all') {
    //     //     return data.filter(d => `${d[3]}`.toLowerCase().indexOf(this.tableFilters.typeFilter) !== -1)
    //     //   }
    //     //   return data
    //     // }),
    //     // map(data => {
    //     //   if (this.tableFilters.statusFilter && this.tableFilters.statusFilter !== 'all') {
    //     //     return data.filter(d => `${d[7]}`.toLowerCase().indexOf(this.tableFilters.statusFilter) !== -1)
    //     //   }
    //     //   return data
    //     // }),
    //     // map(data => tableTextFilter(data, this.tableFilters.textFilter)),
    //     // tap(console.log),
    //     icaTableTextFilter(this.tableFilters.textFilter, this.contractsTableColumns),
    //     toArray()
    //   ))
    // )

    const rows$ = this._contractsTableRows.asObservable().pipe(
      tap(rows => console.log(this, this.tableFilters.textFilter)),
      icaTableTextFilter(this.tableFilters.textFilter, this.contractsTableColumns),
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

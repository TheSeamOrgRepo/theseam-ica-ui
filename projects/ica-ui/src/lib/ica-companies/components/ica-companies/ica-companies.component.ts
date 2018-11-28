import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core'
import { untilDestroyed } from 'ngx-take-until-destroy'
import { BehaviorSubject, Observable, of, from } from 'rxjs'
import { map, switchMap, toArray } from 'rxjs/operators'

import { IcaTablePaginationComponent, IRowAction, icaTableTextFilter, IcaTableColumn } from './../../../ica-table/index'

import { IcaCompaniesTableFiltersComponent } from './../ica-companies-table-filters/ica-companies-table-filters.component'

@Component({
  selector: 'ica-companies',
  templateUrl: './ica-companies.component.html',
  styleUrls: ['./ica-companies.component.scss']
})
export class IcaCompaniesComponent implements OnInit, OnDestroy {

  public dataLength$: Observable<number>

  @Input()
  get companiesTableColumns() { return this._companiesTableColumns.value }
  set companiesTableColumns(value: IcaTableColumn[]) { this._companiesTableColumns.next(value) }
  private _companiesTableColumns = new BehaviorSubject<IcaTableColumn[]>([])
  public companiesTableColumns$: Observable<IcaTableColumn[]>

  @Input()
  get companiesTableRows() { return this._companiesTableRows.value }
  set companiesTableRows(value: any[]) { this._companiesTableRows.next(value) }
  private _companiesTableRows = new BehaviorSubject<any[]>([])
  public companiesTableRows$: Observable<any[]>

  @Output() rowAction = new EventEmitter<IRowAction>()

  @ViewChild(IcaTablePaginationComponent) paginator: IcaTablePaginationComponent
  @ViewChild(IcaCompaniesTableFiltersComponent) tableFilters: IcaCompaniesTableFiltersComponent

  constructor() { }

  ngOnInit() {
    this.paginator.page
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        if (this.companiesTableRows) { this.companiesTableRows = [ ...this.companiesTableRows ] }
      })

    this.companiesTableColumns$ = this._companiesTableColumns.asObservable()

    const columnProps$ = this.companiesTableColumns$
      .pipe(switchMap(cols => from(cols).pipe(map(c => c.prop), toArray())))

    const textFilter$ = this.tableFilters.textFilter$

    const rows$ = this._companiesTableRows.asObservable().pipe(
      icaTableTextFilter(textFilter$, columnProps$),
    )

    this.companiesTableRows$ = rows$.pipe(
      map(data => {
        if (!data) { return data }
        if (!this.paginator) { return data }

        const startIndex = this.paginator.pageIndex * this.paginator.pageSize
        return data.slice().splice(startIndex, this.paginator.pageSize)
      })
    )

    this.dataLength$ = rows$.pipe(map(data => (data) ? data.length : 0))
  }

  ngOnDestroy() { }

  onRowAction(rowAction: IRowAction) {
    this.rowAction.emit(rowAction)
  }

}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core'

import { IcaCompaniesTableFiltersComponent } from './../ica-companies-table-filters/ica-companies-table-filters.component'
import { IcaTablePaginationComponent } from './../../../ica-table/components/ica-table-pagination/ica-table-pagination.component'
import { IRowAction } from './../../../ica-table/components/ica-table/ica-table.component'
import { tableTextFilter } from '../../../ica-table/utils/index'
import { BehaviorSubject, Observable } from 'rxjs'
import { untilDestroyed } from 'ngx-take-until-destroy'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ica-companies',
  templateUrl: './ica-companies.component.html',
  styleUrls: ['./ica-companies.component.scss']
})
export class IcaCompaniesComponent implements OnInit, OnDestroy {

  private _companiesTableRows = new BehaviorSubject<any[]>([])
  public companiesTableRows$: Observable<any[]>

  public dataLength$: Observable<number>

  @Input() companiesTableColumns
  @Input()
  get companiesTableRows() { return this._companiesTableRows.value }
  set companiesTableRows(value: any[]) { this._companiesTableRows.next(value) }

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

    this.tableFilters.textFilter$
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        if (this.companiesTableRows) { this.companiesTableRows = [ ...this.companiesTableRows ] }
      })

    const rows$ = this._companiesTableRows.asObservable().pipe(
      map(data => tableTextFilter(data, this.tableFilters.textFilter))
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

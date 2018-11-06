import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core'

import { IcaShipmentsTableFiltersComponent } from './../ica-shipments-table-filters/ica-shipments-table-filters.component'
import { IcaTablePaginationComponent } from './../../../ica-table/components/ica-table-pagination/ica-table-pagination.component'
import { IRowAction } from './../../../ica-table/components/ica-table/ica-table.component'
import { tableTextFilter } from '../../../ica-table/utils'
import { BehaviorSubject, Observable } from 'rxjs'
import { untilDestroyed } from 'ngx-take-until-destroy'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ica-shipments',
  templateUrl: './ica-shipments.component.html',
  styleUrls: ['./ica-shipments.component.scss']
})
export class IcaShipmentsComponent implements OnInit, OnDestroy {

  private _shipmentsTableRows = new BehaviorSubject<any[]>([])
  public shipmentsTableRows$: Observable<any[]>

  public dataLength$: Observable<number>

  @Input() shipmentsTableColumns
  @Input()
  get shipmentsTableRows() { return this._shipmentsTableRows.value }
  set shipmentsTableRows(value: any[]) { this._shipmentsTableRows.next(value) }

  @ViewChild(IcaTablePaginationComponent) paginator: IcaTablePaginationComponent
  @ViewChild(IcaShipmentsTableFiltersComponent) tableFilters: IcaShipmentsTableFiltersComponent

  constructor() { }

  ngOnInit() {
    this.paginator.page
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        if (this.shipmentsTableRows) { this.shipmentsTableRows = [ ...this.shipmentsTableRows ] }
      })

    this.tableFilters.textFilter$
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        if (this.shipmentsTableRows) { this.shipmentsTableRows = [ ...this.shipmentsTableRows ] }
      })

    const rows$ = this._shipmentsTableRows.asObservable().pipe(
      map(data => tableTextFilter(data, this.tableFilters.textFilter))
    )

    this.shipmentsTableRows$ = rows$.pipe(
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

}

import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core'
import { BehaviorSubject, Observable, from } from 'rxjs'
import { untilDestroyed } from 'ngx-take-until-destroy'
import { map, switchMap, toArray } from 'rxjs/operators'

import { IcaTablePaginationComponent, icaTableTextFilter, IcaTableColumn } from './../../../ica-table/index'

import { IcaShipmentsTableFiltersComponent } from './../ica-shipments-table-filters/ica-shipments-table-filters.component'

@Component({
  selector: 'ica-shipments',
  templateUrl: './ica-shipments.component.html',
  styleUrls: ['./ica-shipments.component.scss']
})
export class IcaShipmentsComponent implements OnInit, OnDestroy {

  public dataLength$: Observable<number>

  @Input()
  get shipmentsTableColumns() { return this._shipmentsTableColumns.value }
  set shipmentsTableColumns(value: IcaTableColumn[]) { this._shipmentsTableColumns.next(value) }
  private _shipmentsTableColumns = new BehaviorSubject<IcaTableColumn[]>([])
  public shipmentsTableColumns$: Observable<IcaTableColumn[]>

  @Input()
  get shipmentsTableRows() { return this._shipmentsTableRows.value }
  set shipmentsTableRows(value: any[]) { this._shipmentsTableRows.next(value) }
  private _shipmentsTableRows = new BehaviorSubject<any[]>([])
  public shipmentsTableRows$: Observable<any[]>

  @ViewChild(IcaTablePaginationComponent) paginator: IcaTablePaginationComponent
  @ViewChild(IcaShipmentsTableFiltersComponent) tableFilters: IcaShipmentsTableFiltersComponent

  constructor() { }

  ngOnInit() {
    this.paginator.page
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        if (this.shipmentsTableRows) { this.shipmentsTableRows = [ ...this.shipmentsTableRows ] }
      })

    this.shipmentsTableColumns$ = this._shipmentsTableColumns.asObservable()

    const columnProps$ = this.shipmentsTableColumns$
      .pipe(switchMap(cols => from(cols).pipe(map(c => c.prop), toArray())))

    const textFilter$ = this.tableFilters.textFilter$

    const rows$ = this._shipmentsTableRows.asObservable().pipe(
      icaTableTextFilter(textFilter$, columnProps$),
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

import { Component, OnInit, Input, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core'
import { BehaviorSubject, Observable, from } from 'rxjs'
import { untilDestroyed } from 'ngx-take-until-destroy'
import { map, switchMap, toArray } from 'rxjs/operators'

import { IcaTablePaginationComponent, IRowAction, icaTableTextFilter, IcaTableColumn } from './../../../ica-table/index'

import { IcaDocumentsTableFiltersComponent } from '../ica-documents-table-filters/ica-documents-table-filters.component'

@Component({
  selector: 'ica-documents',
  templateUrl: './ica-documents.component.html',
  styleUrls: ['./ica-documents.component.scss']
})
export class IcaDocumentsComponent implements OnInit, OnDestroy {

  public dataLength$: Observable<number>

  @Input()
  get documentsTableColumns() { return this._documentsTableColumns.value }
  set documentsTableColumns(value: IcaTableColumn[]) { this._documentsTableColumns.next(value) }
  private _documentsTableColumns = new BehaviorSubject<IcaTableColumn[]>([])
  public documentsTableColumns$: Observable<IcaTableColumn[]>

  @Input()
  get documentsTableRows() { return this._documentsTableRows.value }
  set documentsTableRows(value: any[]) { this._documentsTableRows.next(value) }
  private _documentsTableRows = new BehaviorSubject<any[]>([])
  public documentsTableRows$: Observable<any[]>

  @Output() clickNewDocumentBtn = new EventEmitter<void>()
  @Output() rowAction = new EventEmitter<IRowAction>()

  @ViewChild(IcaTablePaginationComponent) paginator: IcaTablePaginationComponent
  @ViewChild(IcaDocumentsTableFiltersComponent) tableFilters: IcaDocumentsTableFiltersComponent

  constructor() { }

  ngOnInit() {
    this.paginator.page
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        if (this.documentsTableRows) { this.documentsTableRows = [ ...this.documentsTableRows ] }
      })

      this.documentsTableColumns$ = this._documentsTableColumns.asObservable()

      const columnProps$ = this.documentsTableColumns$
        .pipe(switchMap(cols => from(cols).pipe(map(c => c.prop), toArray())))

      const textFilter$ = this.tableFilters.textFilter$

      const rows$ = this._documentsTableRows.asObservable().pipe(
        icaTableTextFilter(textFilter$, columnProps$),
      )

    this.documentsTableRows$ = rows$.pipe(
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

  onClickNewDoc() {
    this.clickNewDocumentBtn.emit()
  }

  onRowAction(rowAction: IRowAction) {
    this.rowAction.emit(rowAction)
  }

}

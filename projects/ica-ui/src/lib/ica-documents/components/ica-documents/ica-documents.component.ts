import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core'
import { untilDestroyed } from 'ngx-take-until-destroy'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { IRowAction } from './../../../ica-table/components/ica-table/ica-table.component'
import { IcaTablePaginationComponent } from './../../../ica-table/components/ica-table-pagination/ica-table-pagination.component'
import { IcaDocumentsTableFiltersComponent } from '../ica-documents-table-filters/ica-documents-table-filters.component'
import { tableTextFilter } from './../../../ica-table/utils'

@Component({
  selector: 'ica-documents',
  templateUrl: './ica-documents.component.html',
  styleUrls: ['./ica-documents.component.scss']
})
export class IcaDocumentsComponent implements OnInit, OnDestroy {

  private _documentsTableRows = new BehaviorSubject<any[]>([])
  public documentsTableRows$: Observable<any[]>

  public dataLength$: Observable<number>

  @Input() documentsTableColumns
  @Input()
  get documentsTableRows() { return this._documentsTableRows.value }
  set documentsTableRows(value: any[]) { this._documentsTableRows.next(value) }

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

    this.tableFilters.textFilter$
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        if (this.documentsTableRows) { this.documentsTableRows = [ ...this.documentsTableRows ] }
      })

    const rows$ = this._documentsTableRows.asObservable().pipe(
      map(data => tableTextFilter(data, this.tableFilters.textFilter))
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

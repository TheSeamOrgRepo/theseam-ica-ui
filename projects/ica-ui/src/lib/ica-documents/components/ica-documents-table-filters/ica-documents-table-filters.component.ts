import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'ica-documents-table-filters',
  templateUrl: './ica-documents-table-filters.component.html',
  styleUrls: ['./ica-documents-table-filters.component.scss']
})
export class IcaDocumentsTableFiltersComponent implements OnInit {

  private textFilterSubject = new BehaviorSubject<string>(undefined)
  public textFilter$ = this.textFilterSubject.asObservable()

  get textFilter() { return this.textFilterSubject.value }
  set textFilter(value: any) { this.textFilterSubject.next(value) }

  dateRanges = [
    { label: 'Last 7 days', value: 'last-7-days' },
    { label: 'Last 30 days', value: 'last-30-days' },
    { label: 'Last 3 months', value: 'last-3-months' },
    { label: 'Last 6 months', value: 'last-6-months' },
    { label: 'Last year', value: 'last-year' },
    { label: 'Custom', value: 'custom' }
  ]

  private _dateRangeFilterSubject = new BehaviorSubject<string>(this.dateRanges[0].value)
  public dateRangeFilter$ = this._dateRangeFilterSubject.asObservable()

  get dateRangeFilter() { return this._dateRangeFilterSubject.value }
  set dateRangeFilter(value: any) { this._dateRangeFilterSubject.next(value) }

  constructor() { }

  ngOnInit() {
  }

}

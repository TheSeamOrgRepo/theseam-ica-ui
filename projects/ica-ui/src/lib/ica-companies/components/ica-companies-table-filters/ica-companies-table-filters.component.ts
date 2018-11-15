import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'ica-companies-table-filters',
  templateUrl: './ica-companies-table-filters.component.html',
  styleUrls: ['./ica-companies-table-filters.component.scss']
})
export class IcaCompaniesTableFiltersComponent implements OnInit {

  private textFilterSubject = new BehaviorSubject<string>(undefined)
  public textFilter$ = this.textFilterSubject.asObservable()

  get textFilter() { return this.textFilterSubject.value }
  set textFilter(value: any) { this.textFilterSubject.next(value) }

  types = [
    { label: 'All', value: 'all' },
    { label: 'Related', value: 'related' },
    { label: 'Affiliate', value: 'affiliate' }
  ]

  private _typeFilterSubject = new BehaviorSubject<string>(this.types[0].value)
  public typeFilter$ = this._typeFilterSubject.asObservable()

  get typeFilter() { return this._typeFilterSubject.value }
  set typeFilter(value: any) { this._typeFilterSubject.next(value) }

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

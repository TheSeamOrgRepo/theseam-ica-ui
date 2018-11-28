import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'ica-contracts-table-filters',
  templateUrl: './ica-contracts-table-filters.component.html',
  styleUrls: ['./ica-contracts-table-filters.component.scss']
})
export class IcaContractsTableFiltersComponent implements OnInit {

  private textFilterSubject = new BehaviorSubject<string>('')
  public textFilter$ = this.textFilterSubject.asObservable()

  get textFilter() { return this.textFilterSubject.value }
  set textFilter(value: any) { this.textFilterSubject.next(value) }

  types = [
    { label: 'All', value: 'all' },
    { label: 'Sale', value: 'sale' },
    { label: 'Purchase', value: 'purchase' }
  ]

  private typeFilterSubject = new BehaviorSubject<string>(this.types[0].value)
  public typeFilter$ = this.typeFilterSubject.asObservable()

  get typeFilter() { return this.typeFilterSubject.value }
  set typeFilter(value: any) { this.typeFilterSubject.next(value) }

  status = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Closed', value: 'closed' }
  ]

  private statusFilterSubject = new BehaviorSubject<string>(this.status[0].value)
  public statusFilter$ = this.statusFilterSubject.asObservable()

  get statusFilter() { return this.statusFilterSubject.value }
  set statusFilter(value: any) { this.statusFilterSubject.next(value) }

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

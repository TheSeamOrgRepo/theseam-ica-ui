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

  get typeFilter() { return this._textFilterSubject.value }
  set typeFilter(value: any) { this._textFilterSubject.next(value) }
  private _textFilterSubject = new BehaviorSubject<string>(this.types[0].value)
  public typeFilter$ = this._textFilterSubject.asObservable()

  constructor() { }

  ngOnInit() {
  }

}

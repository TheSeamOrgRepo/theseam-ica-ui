import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

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

  constructor() { }

  ngOnInit() {
  }

}

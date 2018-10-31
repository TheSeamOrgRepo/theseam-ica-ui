import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'ica-contracts-table-filters',
  templateUrl: './ica-contracts-table-filters.component.html',
  styleUrls: ['./ica-contracts-table-filters.component.scss']
})
export class IcaContractsTableFiltersComponent implements OnInit {

  private textFilterSubject = new BehaviorSubject<string>(undefined)
  public textFilter$ = this.textFilterSubject.asObservable()

  get textFilter() { return this.textFilterSubject.value }
  set textFilter(value: any) { this.textFilterSubject.next(value) }

  constructor() { }

  ngOnInit() {
  }

}

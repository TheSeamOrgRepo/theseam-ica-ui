import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'ica-shipments-table-filters',
  templateUrl: './ica-shipments-table-filters.component.html',
  styleUrls: ['./ica-shipments-table-filters.component.scss']
})
export class IcaShipmentsTableFiltersComponent implements OnInit {

  private textFilterSubject = new BehaviorSubject<string>(undefined)
  public textFilter$ = this.textFilterSubject.asObservable()

  get textFilter() { return this.textFilterSubject.value }
  set textFilter(value: any) { this.textFilterSubject.next(value) }

  constructor() { }

  ngOnInit() {
  }

}

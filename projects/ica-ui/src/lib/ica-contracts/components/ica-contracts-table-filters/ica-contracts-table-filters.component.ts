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

  private typeFilterSubject = new BehaviorSubject<string>('all')
  public typeFilter$ = this.typeFilterSubject.asObservable()

  get typeFilter() { return this.typeFilterSubject.value }
  set typeFilter(value: any) { this.typeFilterSubject.next(value) }

  private statusFilterSubject = new BehaviorSubject<string>('all')
  public statusFilter$ = this.statusFilterSubject.asObservable()

  get statusFilter() { return this.statusFilterSubject.value }
  set statusFilter(value: any) { this.statusFilterSubject.next(value) }

  constructor() { }

  ngOnInit() {
  }

}

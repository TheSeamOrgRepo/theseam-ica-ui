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

  constructor() { }

  ngOnInit() {
  }

}

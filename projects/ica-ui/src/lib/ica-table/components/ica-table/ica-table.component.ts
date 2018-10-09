import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'ica-table',
  templateUrl: './ica-table.component.html',
  styleUrls: ['./ica-table.component.scss']
})
export class IcaTableComponent implements OnInit {

  @Input() columns: string
  @Input() rows: string

  @Input() tableCssClasses: string
  @Input() hasActions = false

  constructor() { }

  ngOnInit() {
  }

}

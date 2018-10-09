import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'ica-dashboard-overview',
  templateUrl: './ica-dashboard-overview.component.html',
  styleUrls: ['./ica-dashboard-overview.component.scss']
})
export class IcaDashboardOverviewComponent implements OnInit {

  @Input() userName: string
  @Input() contractsTableColumns
  @Input() contractsTableRows
  @Input() shipmentsTableColumns
  @Input() shipmentsTableRows
  @Input() documentsTableColumns
  @Input() documentsTableRows

  constructor() { }

  ngOnInit() {
  }

}

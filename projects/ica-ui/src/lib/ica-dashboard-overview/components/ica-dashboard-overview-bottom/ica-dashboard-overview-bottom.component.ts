import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'ica-dashboard-overview-bottom',
  templateUrl: './ica-dashboard-overview-bottom.component.html',
  styleUrls: ['./ica-dashboard-overview-bottom.component.scss']
})
export class IcaDashboardOverviewBottomComponent implements OnInit {

  @Input() contractsTableColumns
  @Input() contractsTableRows
  @Input() shipmentsTableColumns
  @Input() shipmentsTableRows
  @Input() documentsTableColumns
  @Input() documentsTableRows

  public activeTab = 'contracts'

  constructor() { }

  ngOnInit() {
  }

  activateTab(tabName: string) {
    this.activeTab = tabName
  }

}

import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'ica-dashboard-overview-top-bar',
  templateUrl: './ica-dashboard-overview-top-bar.component.html',
  styleUrls: ['./ica-dashboard-overview-top-bar.component.scss']
})
export class IcaDashboardOverviewTopBarComponent implements OnInit {

  hasUnreadNotifications = false

  constructor() { }

  ngOnInit() {
  }

}

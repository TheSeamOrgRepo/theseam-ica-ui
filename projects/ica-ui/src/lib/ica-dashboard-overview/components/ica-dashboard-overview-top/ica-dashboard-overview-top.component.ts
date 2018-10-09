import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'ica-dashboard-overview-top',
  templateUrl: './ica-dashboard-overview-top.component.html',
  styleUrls: ['./ica-dashboard-overview-top.component.scss']
})
export class IcaDashboardOverviewTopComponent implements OnInit {

  @Input() userName: string

  constructor() { }

  ngOnInit() {
  }

}

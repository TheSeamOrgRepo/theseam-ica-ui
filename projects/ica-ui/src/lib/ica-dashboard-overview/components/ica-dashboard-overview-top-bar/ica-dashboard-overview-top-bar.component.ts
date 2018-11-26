import { Component, OnInit, Inject } from '@angular/core'

import { IcaNotificationsService, IcaNotifications } from '../../../ica-notifications/'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ica-dashboard-overview-top-bar',
  templateUrl: './ica-dashboard-overview-top-bar.component.html',
  styleUrls: ['./ica-dashboard-overview-top-bar.component.scss']
})
export class IcaDashboardOverviewTopBarComponent implements OnInit {

  hasUnreadNotifications$: Observable<boolean>

  constructor(
    @Inject(IcaNotificationsService) public icaNotificationsService: IcaNotifications
  ) {
    this.hasUnreadNotifications$ = this.icaNotificationsService.unreadNotifications$.pipe(
      map(unreadNotifications => unreadNotifications && unreadNotifications.length > 0)
    )
  }

  ngOnInit() {
  }

}

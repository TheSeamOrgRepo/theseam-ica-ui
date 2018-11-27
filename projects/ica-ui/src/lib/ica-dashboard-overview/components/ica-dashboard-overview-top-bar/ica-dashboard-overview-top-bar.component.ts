import { Component, OnInit, Inject, Optional } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { IcaNotificationsService, IcaNotifications } from '../../../ica-notifications/'

@Component({
  selector: 'ica-dashboard-overview-top-bar',
  templateUrl: './ica-dashboard-overview-top-bar.component.html',
  styleUrls: ['./ica-dashboard-overview-top-bar.component.scss']
})
export class IcaDashboardOverviewTopBarComponent implements OnInit {

  hasUnreadNotifications$: Observable<boolean>

  constructor(
    @Optional() @Inject(IcaNotificationsService) private icaNotifications: IcaNotifications
  ) {
    if (this.icaNotifications) {
      this.hasUnreadNotifications$ = this.icaNotifications.unreadNotifications$.pipe(
        map(unreadNotifications => unreadNotifications && unreadNotifications.length > 0)
      )
    } else {
      this.hasUnreadNotifications$ = of(false)
    }
  }

  ngOnInit() {
  }

}

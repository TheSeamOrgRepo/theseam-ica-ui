import { Component, OnInit, Inject, Optional } from '@angular/core'
import { Observable, of } from 'rxjs'

import { IIcaUiNotification, IcaNotificationsService, IcaNotifications } from '../../ica-notifications.models'
import { unreadNotificationsFirst } from '../../utils/index'

@Component({
  selector: 'ica-notifications-mini',
  templateUrl: './ica-notifications-mini.component.html',
  styleUrls: ['./ica-notifications-mini.component.scss']
})
export class IcaNotificationsMiniComponent implements OnInit {

  public notifications$: Observable<IIcaUiNotification[]>

  constructor(
    @Optional() @Inject(IcaNotificationsService) public icaNotifications: IcaNotifications,
  ) {
    if (this.icaNotifications) {
      this.notifications$ = this.icaNotifications.notifications$
        .pipe(unreadNotificationsFirst())
    } else {
      this.notifications$ = of([])
    }
  }

  ngOnInit() {
  }

}

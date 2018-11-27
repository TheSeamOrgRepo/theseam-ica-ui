import { Component, OnInit, Inject } from '@angular/core'
import { Observable } from 'rxjs'

import { IIcaUiNotification, IcaNotificationsService, IcaNotifications } from '../../ica-notifications.models'
import { unreadNotificationsFirst } from '../../utils/index'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'ica-notifications-mini',
  templateUrl: './ica-notifications-mini.component.html',
  styleUrls: ['./ica-notifications-mini.component.scss']
})
export class IcaNotificationsMiniComponent implements OnInit {

  public notifications$: Observable<IIcaUiNotification[]>

  constructor(
    @Inject(IcaNotificationsService) public icaNotifications: IcaNotifications,
  ) {
    this.notifications$ = this.icaNotifications.notifications$
      .pipe(unreadNotificationsFirst())
  }

  ngOnInit() {
  }

}

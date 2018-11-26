import { Component, OnInit, Optional, Inject } from '@angular/core'

import { IcaNotificationsService, IcaNotifications } from '../../ica-notifications.models'

@Component({
  selector: 'ica-notifications-mini',
  templateUrl: './ica-notifications-mini.component.html',
  styleUrls: ['./ica-notifications-mini.component.scss']
})
export class IcaNotificationsMiniComponent implements OnInit {

  constructor(
    @Inject(IcaNotificationsService) public icaLoginAuthService: IcaNotifications,
  ) { }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'

import { IcaNotifications, IIcaUiNotification, unreadNotificationsOnly } from '@theseam/ica-ui'
import { filter, switchMap, toArray } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NotificationsExampleService implements IcaNotifications {

  private _notificationsSubject = new BehaviorSubject<IIcaUiNotification[]>([
    {
      id: '1',
      originator: 'Some Company 1',
      createDate: new Date('2018-08-14T16:05:58.412Z'),
      message: 'A new contract has been proposed to you',
      messageType: 'New Contract',
      route: '/contracts',
      isRead: true
    },
    {
      id: '2',
      originator: 'Some Company 1',
      createDate: new Date('2018-08-14T16:06:58.412Z'),
      message: 'A new contract has been proposed to you',
      messageType: 'New Contract',
      route: '/contracts',
      isRead: false
    },
    {
      id: '3',
      originator: 'Another Company 1',
      createDate: new Date('2018-09-14T13:02:58.412Z'),
      message: 'A new contract has been proposed to you',
      messageType: 'New Contract',
      route: '/contracts',
      isRead: true
    },
    {
      id: '4',
      originator: 'Another Company 2',
      createDate: new Date('2018-07-14T9:25:58.412Z'),
      message: 'A new contract has been proposed to you',
      messageType: 'New Contract',
      route: '/contracts',
      isRead: true
    },
    {
      id: '5',
      originator: 'Another Company 1',
      createDate: new Date('2018-08-14T16:05:58.412Z'),
      message: 'A new contract has been proposed to you',
      messageType: 'New Contract',
      route: '/contracts',
      isRead: false
    }
  ])

  notifications$: Observable<IIcaUiNotification[]>

  unreadNotifications$: Observable<IIcaUiNotification[]>

  constructor() {
    this.notifications$ = this._notificationsSubject.asObservable()

    this.unreadNotifications$ = this.notifications$.pipe(unreadNotificationsOnly())
  }

}

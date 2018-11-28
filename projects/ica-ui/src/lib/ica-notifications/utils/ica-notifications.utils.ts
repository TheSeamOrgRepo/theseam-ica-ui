import { Observable, from } from 'rxjs'
import { filter, switchMap, toArray, map } from 'rxjs/operators'

import { IIcaUiNotification } from '../ica-notifications.models'

export const unreadNotificationsFirst = () => (source: Observable<IIcaUiNotification[]>) =>
  source.pipe(map(notifs => notifs.sort(notif => notif.isRead ? -1 : 1)))

export const unreadNotificationsLast = () => (source: Observable<IIcaUiNotification[]>) =>
  source.pipe(map(notifs => notifs.sort(notif => notif.isRead ? 1 : -1)))

export const unreadNotificationsOnly = () => (source: Observable<IIcaUiNotification[]>) =>
  source.pipe(switchMap(notifs => from(notifs).pipe(filter(v => !v.isRead), toArray())))

export const readNotificationsOnly = () => (source: Observable<IIcaUiNotification[]>) =>
  source.pipe(switchMap(notifs => from(notifs).pipe(filter(v => v.isRead), toArray())))

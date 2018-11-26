import { Observable } from 'rxjs'
import { InjectionToken } from '@angular/core'

export interface IIcaUiNotification {
  id: string
  originator: string,
  userId?: string,
  companyId?: string,
  createDate: Date,
  dispositionDate?: Date,
  message: string,
  messageType: string,
  route: string,
  isRead: boolean
}

export interface IcaNotifications {
  notifications$: Observable<IIcaUiNotification[]>
  unreadNotifications$: Observable<IIcaUiNotification[]>
}

export const IcaNotificationsService = new InjectionToken<IcaNotifications>('IcaNotifications')

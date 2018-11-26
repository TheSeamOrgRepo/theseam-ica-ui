import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IcaNotificationsMiniComponent } from './components/ica-notifications-mini/ica-notifications-mini.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IcaNotificationsMiniComponent
  ],
  exports: [
    IcaNotificationsMiniComponent
  ]
})
export class IcaNotificationsModule { }

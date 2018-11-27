import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { IcaNotificationsMiniComponent } from './components/ica-notifications-mini/ica-notifications-mini.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    IcaNotificationsMiniComponent
  ],
  exports: [
    IcaNotificationsMiniComponent
  ]
})
export class IcaNotificationsModule { }

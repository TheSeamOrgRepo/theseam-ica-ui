import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { IcaNavigationComponent } from './components/ica-navigation.component'


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    IcaNavigationComponent
  ],
  exports: [
    IcaNavigationComponent
  ]
})
export class IcaNavigationModule { }

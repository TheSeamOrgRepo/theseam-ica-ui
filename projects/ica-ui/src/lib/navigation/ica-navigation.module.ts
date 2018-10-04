import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { IcaNavigationComponent } from './components/ica-navigation.component'
import { IcaTopBarContentDirective } from './directives/ica-top-bar-content.directive'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    IcaNavigationComponent,
    IcaTopBarContentDirective
  ],
  exports: [
    IcaNavigationComponent,
    IcaTopBarContentDirective
  ]
})
export class IcaNavigationModule { }

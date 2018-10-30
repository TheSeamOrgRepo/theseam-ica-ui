import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaCommonModule } from '../common'

import { IcaDashboardComponent } from './components/ica-dashboard/ica-dashboard.component'

import { IcaTopBarContentDirective } from './directives/ica-top-bar-content.directive'
import { IcaSideNavDirective } from './directives/ica-side-nav.directive'

@NgModule({
  imports: [
    CommonModule,
    IcaCommonModule
  ],
  declarations: [
    IcaDashboardComponent,
    IcaTopBarContentDirective,
    IcaSideNavDirective
  ],
  exports: [
    IcaDashboardComponent,
    IcaTopBarContentDirective,
    IcaSideNavDirective
  ]
})
export class IcaDashboardModule { }

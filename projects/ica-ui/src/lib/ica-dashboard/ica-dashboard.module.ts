import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaDashboardComponent } from './components/ica-dashboard/ica-dashboard.component'
import { IcaSvgDefsComponent } from './components/ica-svg-defs/ica-svg-defs.component'

import { IcaTopBarContentDirective } from './directives/ica-top-bar-content.directive'
import { IcaSideNavDirective } from './directives/ica-side-nav.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IcaDashboardComponent,
    IcaTopBarContentDirective,
    IcaSideNavDirective,
    IcaSvgDefsComponent
  ],
  exports: [
    IcaDashboardComponent,
    IcaTopBarContentDirective,
    IcaSideNavDirective,
    IcaSvgDefsComponent
  ]
})
export class IcaDashboardModule { }

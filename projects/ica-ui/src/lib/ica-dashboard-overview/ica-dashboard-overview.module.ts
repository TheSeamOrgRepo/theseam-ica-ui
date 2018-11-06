import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { IcaTableModule } from '../ica-table'
import { IcaCommonModule } from '../common'

// tslint:disable:max-line-length
import { IcaDashboardOverviewComponent } from './components/ica-dashboard-overview/ica-dashboard-overview.component'
import { IcaDashboardOverviewTopComponent } from './components/ica-dashboard-overview-top/ica-dashboard-overview-top.component'
import { IcaDashboardOverviewBottomComponent } from './components/ica-dashboard-overview-bottom/ica-dashboard-overview-bottom.component'
import { IcaDashboardOverviewTabContainerComponent } from './components/ica-dashboard-overview-tab-container/ica-dashboard-overview-tab-container.component'
import { IcaDashboardOverviewTopBarComponent } from './components/ica-dashboard-overview-top-bar/ica-dashboard-overview-top-bar.component'
// tslint:enable:max-line-length


const components = [
  IcaDashboardOverviewComponent,
  IcaDashboardOverviewTopComponent,
  IcaDashboardOverviewBottomComponent,
  IcaDashboardOverviewTabContainerComponent,
  IcaDashboardOverviewTopBarComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IcaCommonModule,
    IcaTableModule
  ],
  declarations: [ ...components ],
  exports: [ ...components ]
})
export class IcaDashboardOverviewModule { }

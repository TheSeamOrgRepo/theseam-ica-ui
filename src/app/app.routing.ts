import { RouterModule, Routes } from '@angular/router'

import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component'
import { MainContainerComponent } from 'src/app/components/main-container/main-container.component'
import { HomeComponent } from 'src/app/components/home/home.component'
import { ContractsComponent } from 'src/app/components/contracts/contracts.component'
import { ContractBuilderComponent } from 'src/app/components/contract-builder/contract-builder.component'
import { DashboardOverviewComponent } from 'src/app/components/dashboard-overview/dashboard-overview.component'
import { CompaniesComponent } from 'src/app/components/companies/companies.component'
import { ShipmentsComponent } from 'src/app/components/shipments/shipments.component'
import { DocumentsComponent } from 'src/app/components/documents/documents.component'

import { IcaLoginComponent, IcaContractBuilderTopBarComponent, IcaDashboardOverviewTopBarComponent } from '@theseam/ica-ui'


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: IcaLoginComponent,
    data: { state: 'login'}
  },
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { state: 'home'}
      },
      {
        path: 'dashboard',
        component: DashboardOverviewComponent,
        data: { state: 'dashboard'}
      },
      {
        path: 'contracts',
        component: ContractsComponent,
        data: { state: 'contracts'}
      },
      {
        path: 'new-contract',
        component: ContractBuilderComponent,
        data: { state: 'new-contract'}
      },
      {
        path: '',
        component: IcaContractBuilderTopBarComponent,
        outlet: 'topBar'
      },
      // {
      //   path: '',
      //   component: IcaDashboardOverviewTopBarComponent,
      //   outlet: 'topBar'
      // },
      {
        path: 'companies',
        component: CompaniesComponent,
        data: { state: 'companies'}
      },
      {
        path: 'shipments',
        component: ShipmentsComponent,
        data: { state: 'shipments'}
      },
      {
        path: 'documents',
        component: DocumentsComponent,
        data: { state: 'documents'}
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent },
]

export const routing = RouterModule.forRoot(routes, {
  useHash: true,
  // enableTracing: true // <-- debugging purposes only
})

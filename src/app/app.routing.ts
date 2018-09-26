import { RouterModule, Routes } from '@angular/router'

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { MainContainerComponent } from './components/main-container/main-container.component'
import { HomeComponent } from './components/home/home.component'

import { IcaLoginComponent } from '@theseam/ica-ui'


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
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
        path: 'login',
        component: IcaLoginComponent,
        data: { state: 'login'}
      },
      {
        path: 'contracts',
        component: HomeComponent,
        data: { state: 'contracts'}
      },
      {
        path: 'companies',
        component: HomeComponent,
        data: { state: 'companies'}
      },
      {
        path: 'shipments',
        component: HomeComponent,
        data: { state: 'shipments'}
      },
      {
        path: 'documents',
        component: HomeComponent,
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

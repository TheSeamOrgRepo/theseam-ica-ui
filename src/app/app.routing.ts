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
      },
      {
        path: 'login',
        component: IcaLoginComponent,
      },
      {
        path: 'contracts',
        component: HomeComponent,
      },
      {
        path: 'companies',
        component: HomeComponent,
      },
      {
        path: 'shipments',
        component: HomeComponent,
      },
      {
        path: 'documents',
        component: HomeComponent,
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent },
]

export const routing = RouterModule.forRoot(routes, {
  // useHash: true,
  // enableTracing: true // <-- debugging purposes only
})

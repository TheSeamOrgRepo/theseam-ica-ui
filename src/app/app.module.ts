import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { APP_BASE_HREF, CommonModule } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {
  IcaDashboardModule,
  IcaNavigationModule,
  IcaLoginModule,
  IcaContractBuilderModule,
  IcaCommonModule,
  IcaLoginAuthService
} from '@theseam/ica-ui'

import { AppComponent } from './app.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { MainContainerComponent } from './components/main-container/main-container.component'
import { HomeComponent } from './components/home/home.component'

import { routing } from './app.routing'
import { LoginAuthExampleService } from 'src/app/services/login-auth-example.service'
import { ContractBuilderComponent } from './components/contract-builder/contract-builder.component'
import { ContractsComponent } from './components/contracts/contracts.component'

@NgModule({
   declarations: [
      AppComponent,
      PageNotFoundComponent,
      MainContainerComponent,
      HomeComponent,
      ContractBuilderComponent,
      ContractsComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      IcaDashboardModule,
      IcaNavigationModule,
      IcaLoginModule,
      IcaContractBuilderModule,
      IcaCommonModule,
      routing,
   ],
   providers: [
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' },
    {
      provide: IcaLoginAuthService,
      useClass: LoginAuthExampleService
    }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

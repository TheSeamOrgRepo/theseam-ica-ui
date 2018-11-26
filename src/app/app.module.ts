import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { APP_BASE_HREF, CommonModule } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {
  IcaDashboardModule,
  IcaDashboardOverviewModule,
  IcaNavigationModule,
  IcaLoginModule,
  IcaContractBuilderModule,
  IcaCommonModule,
  IcaLoginAuthService,
  IcaContractsModule,
  IcaCompaniesModule,
  IcaShipmentsModule,
  IcaDocumentsModule,
  IcaModalFilePreviewModule,
  IcaTableModule,
  IcaModalNewDocumentModule,
  IcaModalContractSignModule,
  IcaModalContractCompleteModule,
  IcaModalSubmitContractModule,
  IcaNotificationsService
} from '@theseam/ica-ui'

import { AppComponent } from './app.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { MainContainerComponent } from './components/main-container/main-container.component'
import { HomeComponent } from './components/home/home.component'
import { ContractBuilderComponent } from './components/contract-builder/contract-builder.component'
import { ContractsComponent } from './components/contracts/contracts.component'
import { DashboardOverviewComponent } from './components/dashboard-overview/dashboard-overview.component'
import { CompaniesComponent } from './components/companies/companies.component'
import { ShipmentsComponent } from './components/shipments/shipments.component'
import { DocumentsComponent } from './components/documents/documents.component'

import { LoginAuthExampleService } from 'src/app/services/login-auth-example.service'
import { NotificationsExampleService } from 'src/app/services/notifications-example.service'

import { routing } from './app.routing'


@NgModule({
   declarations: [
      AppComponent,
      PageNotFoundComponent,
      MainContainerComponent,
      HomeComponent,
      ContractBuilderComponent,
      ContractsComponent,
      DashboardOverviewComponent,
      CompaniesComponent,
      ShipmentsComponent,
      DocumentsComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      IcaDashboardModule,
      IcaDashboardOverviewModule,
      IcaNavigationModule,
      IcaLoginModule,
      IcaContractBuilderModule,
      IcaCommonModule,
      IcaContractsModule,
      IcaCompaniesModule,
      IcaShipmentsModule,
      IcaDocumentsModule,
      IcaModalFilePreviewModule,
      IcaTableModule,
      IcaModalNewDocumentModule,
      IcaModalContractCompleteModule,
      IcaModalContractSignModule,
      IcaModalSubmitContractModule,
      routing,
   ],
   providers: [
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' },
    {
      provide: IcaLoginAuthService,
      useClass: LoginAuthExampleService
    },
    {
      provide: IcaNotificationsService,
      useClass: NotificationsExampleService
    }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

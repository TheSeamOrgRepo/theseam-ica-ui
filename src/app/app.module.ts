import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { APP_BASE_HREF, CommonModule } from '@angular/common'

import { IcaNavigationModule } from '@theseam/ica-ui'
import { IcaLoginModule } from '@theseam/ica-ui'
import { IcaCommonModule } from '@theseam/ica-ui'

import { AppComponent } from './app.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { MainContainerComponent } from './components/main-container/main-container.component'
import { HomeComponent } from './components/home/home.component'

import { routing } from './app.routing'

@NgModule({
   declarations: [
      AppComponent,
      PageNotFoundComponent,
      MainContainerComponent,
      HomeComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      IcaNavigationModule,
      IcaLoginModule,
      IcaCommonModule,
      routing,
   ],
   providers: [
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

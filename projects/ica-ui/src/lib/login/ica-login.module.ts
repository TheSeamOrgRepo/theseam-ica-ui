import { RouterModule } from '@angular/router'
import { NgModule, ModuleWithProviders } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { IcaLoginAuth, IcaLoginAuthService } from './ica-login.models'
import { IcaLoginComponent } from './components/ica-login.component'

import { IcaCommonModule } from './../common/ica-common.module'

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    IcaCommonModule
  ],
  declarations: [IcaLoginComponent],
  exports: [IcaLoginComponent]
})
export class IcaLoginModule {

  static forRoot(loginAuth: IcaLoginAuth): ModuleWithProviders {
    return {
      ngModule: IcaLoginModule,
      providers: [
        {
          provide: IcaLoginAuthService,
          useValue: loginAuth
        }
      ]
    }
  }

}

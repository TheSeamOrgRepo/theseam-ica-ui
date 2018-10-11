import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SignaturePadModule } from 'angular2-signaturepad'

import { IcaModalContractSignComponent } from './components/ica-modal-contract-sign/ica-modal-contract-sign.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SignaturePadModule
  ],
  declarations: [ IcaModalContractSignComponent ],
  exports: [ IcaModalContractSignComponent ],
  entryComponents: [ IcaModalContractSignComponent ]
})
export class IcaModalContractSignModule { }

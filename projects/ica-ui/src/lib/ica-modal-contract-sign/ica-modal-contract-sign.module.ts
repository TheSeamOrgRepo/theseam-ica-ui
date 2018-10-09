import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaModalContractSignComponent } from './components/ica-modal-contract-sign/ica-modal-contract-sign.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ IcaModalContractSignComponent ],
  exports: [ IcaModalContractSignComponent ]
})
export class IcaModalContractSignModule { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaModalSubmitContractComponent } from './components/ica-modal-submit-contract/ica-modal-submit-contract.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ IcaModalSubmitContractComponent ],
  exports: [ IcaModalSubmitContractComponent ]
})
export class IcaModalSubmitContractModule { }

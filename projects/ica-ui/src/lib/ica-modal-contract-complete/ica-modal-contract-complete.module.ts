import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IcaModalContractCompleteComponent } from './components/ica-modal-contract-complete/ica-modal-contract-complete.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ IcaModalContractCompleteComponent ],
  exports: [ IcaModalContractCompleteComponent ],
  entryComponents: [ IcaModalContractCompleteComponent ]
})
export class IcaModalContractCompleteModule { }

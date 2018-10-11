import { IcaModalContractSignService } from './../../../ica-modal-contract-sign/services/ica-modal-contract-sign.service'
import { IcaModalSubmitContractService } from './../../../ica-modal-submit-contract/services/ica-modal-submit-contract.service'
import { IcaModalContractCompleteService } from './../../../ica-modal-contract-complete/services/ica-modal-contract-complete.service'
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core'

import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'
import { IContractTemplatePack } from '../../models/ica-contract-builder.models'
import { IcaContractSchemaFormComponent } from '../ica-contract-schema-form/ica-contract-schema-form.component'

@Component({
  selector: 'ica-contract-builder',
  templateUrl: './ica-contract-builder.component.html',
  styles: []
})
export class IcaContractBuilderComponent implements OnInit {

  @Input() contractTemplatePack: IContractTemplatePack

  @Output() submit = new EventEmitter<any>()
  @Output() completed = new EventEmitter<any>()

  @ViewChild(IcaContractSchemaFormComponent) icaSchemaForm: IcaContractSchemaFormComponent

  public formData: object
  public submittedData: any

  showPrefill = true

  constructor(
    public icaCntBuilder: IcaContractBuilderService,
    public icaModalContractComplete: IcaModalContractCompleteService,
    public icaModalSubmitContract: IcaModalSubmitContractService,
    public icaModalContractSign: IcaModalContractSignService
  ) { }

  ngOnInit() {
    this.icaModalSubmitContract.submitContract.subscribe(_ => {
      console.log('[IcaContractBuilderComponent] submitContract:', this.submittedData)
      this.submit.emit(this.submittedData)
    })
    this.icaModalSubmitContract.completeContract.subscribe(_ => {
      console.log('[IcaContractBuilderComponent] completed:')
      this.completed.emit()
    })
    this.icaModalContractSign.newSignature.subscribe(dataUrl => {
      this.submittedData.schemaData.Contract.SellerSignature = dataUrl
    })
  }

  previewFieldClicked(field: string) {
    this.icaSchemaForm.focusField(field)
  }

  onDataChange(data: object) {
    this.formData = data
  }

  onSchemaFormSubmit(event: any) {
    console.log('[IcaContractBuilderComponent] onSchemaFormSubmit', event)
    if (event.generalData && event.schemaData) {
      this.submittedData = event
      this.icaModalContractComplete.open()
    }
    // this.submit.emit(event)
  }

  prefil() {
    this.icaSchemaForm.prefillSchemaData()
  }

}

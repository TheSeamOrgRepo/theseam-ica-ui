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

  @Output() formSubmit = new EventEmitter<any>()
  @Output() completed = new EventEmitter<any>()

  @ViewChild(IcaContractSchemaFormComponent) icaSchemaForm: IcaContractSchemaFormComponent

  public formData: object
  public submittedData: any

  showPrefill = true

  prefilOptions = [
    { label: '21st Century Textiles', value: '21st Century Textiles' },
    { label: 'AXEM Fibers', value: 'AXEM Fibers' },
    { label: 'Cargill, Inc.', value: 'Cargill, Inc.' },
    { label: 'Joe’s Cotton Co.', value: 'Joe’s Cotton Co.' },
  ]

  constructor(
    public icaCntBuilder: IcaContractBuilderService,
    public icaModalContractComplete: IcaModalContractCompleteService,
    public icaModalSubmitContract: IcaModalSubmitContractService,
    public icaModalContractSign: IcaModalContractSignService
  ) { }

  ngOnInit() {
    this.icaCntBuilder.reset()
  }

  previewFieldClicked(field: string) {
    this.icaSchemaForm.focusField(field)
  }

  onDataChange(data: object) {
    this.formData = data
  }

  onSchemaFormSubmit(event: any) {
    this.submittedData = event
    const completeComponentRef = this.icaModalContractComplete.open()
    completeComponentRef.instance.btnFinish.subscribe(() => {
      const submitContractComponentRef = this.icaModalSubmitContract.open()
      this.formSubmit.emit(this.formData)
      submitContractComponentRef.instance.btnFinish.subscribe(() => {
        this.completed.emit()
      })
    })
  }

  prefil() {
    this.icaSchemaForm.prefillSchemaData()
  }

}

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

  @ViewChild(IcaContractSchemaFormComponent) icaSchemaForm: IcaContractSchemaFormComponent

  public formData: object

  showPrefill = true

  constructor(
    public icaCntBuilder: IcaContractBuilderService
  ) {
    // this.icaCntBuilder.data$.subscribe
  }

  ngOnInit() { }

  previewFieldClicked(field: string) {
    this.icaSchemaForm.focusField(field)
  }

  onDataChange(data: object) {
    this.formData = data
  }

  onSchemaFormSubmit(event: any) {
    this.submit.emit(event)
  }

  prefil() {
    this.icaSchemaForm.prefillSchemaData()
  }

}

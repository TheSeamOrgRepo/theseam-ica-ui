import { Component, OnInit, Input, ViewChild } from '@angular/core'

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

  prefil() {
    this.icaSchemaForm.prefillSchemaData()
  }

}

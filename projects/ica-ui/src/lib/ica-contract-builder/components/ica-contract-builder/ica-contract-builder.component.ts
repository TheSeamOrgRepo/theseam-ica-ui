import { Component, OnInit, Input, ViewChild } from '@angular/core'

import { IContractTemplatePack } from '../../models/ica-contract-builder.models'
import { IcaSchemaFormComponent } from '../ica-schema-form/ica-schema-form.component'

@Component({
  selector: 'ica-contract-builder',
  templateUrl: './ica-contract-builder.component.html',
  styles: []
})
export class IcaContractBuilderComponent implements OnInit {

  @Input() contractTemplatePack: IContractTemplatePack

  @ViewChild(IcaSchemaFormComponent) icaSchemaForm: IcaSchemaFormComponent

  constructor() { }

  ngOnInit() { }

  previewFieldClicked(field: string) {
    this.icaSchemaForm.focusField(field)
  }

}

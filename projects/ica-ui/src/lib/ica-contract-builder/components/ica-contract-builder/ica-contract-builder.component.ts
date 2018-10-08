import { ICA_CONTRACT_FORM_WIDGETS } from './../../../ica-contract-form-widgets/ica-contract-form-widgets.module'
import { Component, OnInit, Input } from '@angular/core'

import { IContractTemplatePack } from '../../models/ica-contract-builder.models'

@Component({
  selector: 'ica-contract-builder',
  templateUrl: './ica-contract-builder.component.html',
  styles: []
})
export class IcaContractBuilderComponent implements OnInit {

  @Input() contractTemplatePack: IContractTemplatePack

  public widgets = ICA_CONTRACT_FORM_WIDGETS

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core'
import { JsonSchemaFormService } from 'angular6-json-schema-form'

import { IcaConstractSchemaFormService } from '../../ica-contract-builder/services/ica-constract-schema-form.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'ica-schema-form-wizard-widget',
  templateUrl: './ica-schema-form-wizard-widget.component.html'
})
export class IcaSchemaFormWizardWidgetComponent implements OnInit {

  options: any
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]

  public activePanel$: Observable<number>

  constructor(
    private jsf: JsonSchemaFormService,
    private icaCntForm: IcaConstractSchemaFormService
  ) {
    this.activePanel$ = this.icaCntForm.activeWizardPanel$
  }

  get sectionTitle() {
    return this.options.notitle ? null : this.jsf.setItemTitle(this)
  }

  ngOnInit() {
    this.jsf.initializeControl(this)
    this.options = this.layoutNode.options || {}

    console.log(this)
  }

}

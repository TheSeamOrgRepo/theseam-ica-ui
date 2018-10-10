import { Component, OnInit, Input } from '@angular/core'
import { JsonSchemaFormService } from 'angular6-json-schema-form'

import { IcaConstractSchemaFormService } from '../../ica-contract-builder/services/ica-constract-schema-form.service'
import { take } from 'rxjs/operators'

@Component({
  selector: 'ica-schema-form-wizard-btns-widget',
  templateUrl: './ica-schema-form-wizard-btns-widget.component.html',
  styles: [`
    .next-btn-disabled {
      background-color: #A0E5D0 !important;
    }
  `]
})
export class IcaSchemaFormWizardBtnsWidgetComponent implements OnInit {

  options: any
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]

  public nextBtnText: 'Next' | 'Finish' = 'Next'
  public isLast = false
  public activeWizardPanel = 1

  constructor(
    public jsf: JsonSchemaFormService,
    private icaCntForm: IcaConstractSchemaFormService
  ) { }

  get sectionTitle() {
    return this.options.notitle ? null : this.jsf.setItemTitle(this)
  }

  ngOnInit() {
    this.jsf.initializeControl(this)
    this.options = this.layoutNode.options || {}

    this.updateNextBtn()

    // NOTE: This is temporary
    this.icaCntForm.activeWizardPanel$
      .subscribe(v => {
        this.activeWizardPanel = v
      })
  }

  onClickPrev(event: any) {
    event.preventDefault()
    this.icaCntForm.activeWizardPanel$.pipe(take(1))
      .subscribe(v => {
        if (v > 1) {
          this.icaCntForm.setActiveWizardPanel(v - 1)
          this.updateNextBtn()
        }
      })
  }

  onClickNext(event: any) {
    const wizardPanels = this.wizardPanels()
    if (!((this.activeWizardPanel === wizardPanels.length) && this.jsf.isValid)) {
      event.preventDefault()
    }

    this.icaCntForm.activeWizardPanel$.pipe(take(1))
      .subscribe(v => {
        if (v < wizardPanels.length) {
          this.icaCntForm.setActiveWizardPanel(v + 1)
          this.updateNextBtn()
        }
      })
  }

  public wizardPanels() {
    const foundItems = []

    const _find = (obj: any) => {
      for (const item of obj) {
        if (item.type && item.type === 'wizard-panel') {
          foundItems.push(item)
        } else if (item.items) {
          _find(item.items)
        }
      }
    }

    _find(this.jsf.layout)

    return foundItems
  }

  public updateNextBtn() {
    const wizardPanels = this.wizardPanels()
    this.icaCntForm.activeWizardPanel$.pipe(take(1))
      .subscribe(v => {
        this.nextBtnText = (v === wizardPanels.length) ? 'Finish' : 'Next'
        this.isLast = (v === wizardPanels.length)
      })
  }

}

import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core'
import { JsonSchemaFormComponent, JsonPointer } from 'angular6-json-schema-form'
import { combineLatest } from 'rxjs'
import { switchMap, map, takeWhile, filter, distinctUntilChanged, tap } from 'rxjs/operators'

import { IContractTemplatePack } from '../../models/ica-contract-builder.models'
import { IcaConstractSchemaFormService } from '../../services/ica-constract-schema-form.service'
import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'
import { IcaCommonService } from '../../../common'
import { IcaModalContractCompleteService } from './../../../ica-modal-contract-complete/services/ica-modal-contract-complete.service'


// tslint:disable:max-line-length
import { IcaSchemaFormSectionWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-section-widget/ica-schema-form-section-widget.component'
// import { IcaSchemaFormSignatureWidgetComponent } from '../../../ica-schema-form-signature-widget/ica-schema-form-signature-widget.component'
import { IcaSchemaFormSubmitWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-submit-widget/ica-schema-form-submit-widget.component'
import { IcaSchemaFormInputWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-input-widget/ica-schema-form-input-widget.component'
import { IcaSchemaFormNumberWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-number-widget/ica-schema-form-number-widget.component'
import { IcaSchemaFormWizardWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-wizard-widget/ica-schema-form-wizard-widget.component'
import { IcaSchemaFormCheckboxWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-checkbox-widget/ica-schema-form-checkbox-widget.component'
import { IcaSchemaFormWizardBtnsWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-wizard-btns-widget/ica-schema-form-wizard-btns-widget.component'
import { IcaSchemaFormCounterPartiesComponent } from '../../../ica-contract-form-widgets/ica-schema-form-counter-parties/ica-schema-form-counter-parties.component'
import { IcaSchemaFormSelectInputWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-select-input-widget/ica-schema-form-select-input-widget.component'
// tslint:enable:max-line-length

@Component({
  selector: 'ica-contract-schema-form',
  templateUrl: './ica-contract-schema-form.component.html',
  providers: [ IcaConstractSchemaFormService ]
})
export class IcaContractSchemaFormComponent implements OnInit, OnDestroy {

  @Input() contractTemplatePack: IContractTemplatePack

  @Output() dataChange = new EventEmitter<object>()
  @Output() submit = new EventEmitter<any>()

  @ViewChild(JsonSchemaFormComponent) schemaForm: JsonSchemaFormComponent

  public widgets = {
    // 'schema-form-signature': IcaSchemaFormSignatureWidgetComponent,
    'section': IcaSchemaFormSectionWidgetComponent,
    'submit': IcaSchemaFormSubmitWidgetComponent,
    'text': IcaSchemaFormInputWidgetComponent,
    'number': IcaSchemaFormNumberWidgetComponent,
    'checkbox': IcaSchemaFormCheckboxWidgetComponent,
    'wizard-panel': IcaSchemaFormWizardWidgetComponent,
    'wizard-btns': IcaSchemaFormWizardBtnsWidgetComponent,
    'counter-party': IcaSchemaFormCounterPartiesComponent,
    'select': IcaSchemaFormSelectInputWidgetComponent
  }

  sub: any
  _sub: any

  generalData: any

  constructor(
    public icaCntForm: IcaConstractSchemaFormService,
    public icaCntBuilder: IcaContractBuilderService,
    public icaCommon: IcaCommonService,
    public icaModalContractComplete: IcaModalContractCompleteService
  ) { }

  ngOnInit() {
    const generalValues$ = combineLatest(
      this.icaCntForm.counterParty$,
      this.icaCntForm.contractType$
    ).pipe(map(([counterParty, contractType]) => ({ counterParty, contractType })))

    const companies$ = this.icaCommon.companies$
    const appUsersCompany$ = this.icaCommon.appUserCompany$

    const formValues$ = generalValues$
      .pipe(tap(v => console.log('generalValues$', v)))
      .pipe(takeWhile(val => val !== undefined))
      .pipe(filter(val => val.contractType !== undefined))
      .pipe(filter(val => val.counterParty !== undefined))
      .pipe(distinctUntilChanged((before, after) => {
        return (before.contractType === after.contractType) &&
          (before.counterParty === after.counterParty)
      }))
      .pipe(
        tap(v => console.log('formVals', v)),
        switchMap(formVals =>
          companies$
            .pipe(tap(v => console.log('companies$', v)))
            .pipe(map(companies => {
              const contractType = ['Sell', 'Purchase']
                .find(t => t === formVals.contractType)
              console.log('contractType', contractType)

              console.log('companies', companies)
              console.log('formVals.counterParty', formVals.counterParty)
              // const counterParty = companies
              //   .find(c => c.companyName === formVals.counterParty)
              const counterParty = formVals.counterParty
              console.log('counterParty', counterParty)

              if (contractType && counterParty) {
                return {
                  contractType,
                  counterParty
                }
              }
            }))
            .pipe(takeWhile(val => val !== undefined))
        )
      )

    const formResults$ = formValues$
      .pipe(
        tap(v => console.log('formValues$', v)),
        switchMap(formValues => {
          return appUsersCompany$
            .pipe(tap(v => console.log('appUsersCompany$', v)))
            .pipe(map(appUsersCompany => {
              let knownData

              if (formValues.contractType === 'Sell') {
                knownData = {
                  buyer: formValues.counterParty,
                  seller: appUsersCompany
                }
              } else {
                knownData = {
                  buyer: appUsersCompany,
                  seller: formValues.counterParty
                }
              }
              console.log('knownData', knownData)
              return {
                formValues,
                knownData
              }
            }))
        })
      )

    this._sub = formResults$
      .subscribe(val => {
        console.log('val', val)
        // this.createContractService.setKnownTemplateData(val.knownData)
        // this.formDataNew.emit(val.formValues)
        this.setGeneralData(val)
        this.generalData = val.knownData
      })
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe() }
  }

  public focusField(field: string) {
    const foundItem = this.findInLayout(field)
    if (foundItem._id) {
      const panelIndex = this.findPanelIndexContainingField(foundItem)
      this.icaCntForm.setActiveWizardPanel(panelIndex)
      setTimeout(() => {
        const elem: any = document.querySelector(`#control${foundItem._id}`)
        elem.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
        elem.focus()
      })
    }
  }

  public findInLayout(dataPointer: string) {
    let foundItem

    const _find = (obj: any) => {
      if (foundItem) { return }
      for (const item of obj) {
        if (item.options && item.options.focusedOnPointer && item.options.focusedOnPointer === dataPointer) {
          foundItem = item
        } else if (item.dataPointer && item.dataPointer === dataPointer) {
          foundItem = item
        } else if (item.items) {
          _find(item.items)
        }
      }
    }

    _find(this.schemaForm.jsf.layout)

    return foundItem
  }

  public findPanelIndexContainingField(item: any) {
    for (let i = 1; i < 10; i++) {
      if (document.querySelector(`.panel-idx-${i} #control${item._id}`)) {
        return i
      }
    }
  }

  public schemaFormOnChange(event: any) {
    console.log('schemaFormOnChange', event)
    // const value = JsonPointer.get(event, '/Contract/Terms/Quantity/ContractedUnits')
    // console.log('~value', value)
    this.dataChange.emit(event)
  }

  public schemaFormIsValid(event: any) {
    console.log('schemaFormIsValid', event)
  }

  public schemaFormOnSubmit(event: any) {
    console.log('[IcaContractSchemaFormComponent] schemaFormOnSubmit', event)
    // this.icaModalContractComplete.open()
    const toSubmit = { schemaData: this.schemaForm.value, generalData: this.generalData }
    console.log('[IcaContractSchemaFormComponent] toSubmit', toSubmit)
    this.submit.emit(toSubmit)
  }

  public prefillSchemaData() {
    // console.log('prefill schema form data')

    const tmpCntData = { ...this.schemaForm.value }

    if (!tmpCntData.Contract.Specifications) {
      tmpCntData.Contract.Specifications = {}
    }

    tmpCntData.Contract.Specifications.CropYear = '2018'

    if (!tmpCntData.Contract.Pricing) {
      tmpCntData.Contract.Pricing = {}
    }

    tmpCntData.Contract.Pricing.PriceType = 'On Call'
    tmpCntData.Contract.Pricing.UnitPrice = 87.50
    tmpCntData.Contract.Pricing.PriceBase = 'c/lb'

    if (!tmpCntData.Contract.Terms) {
      tmpCntData.Contract.Terms = {
        Quantity: {},
        ShipmentPeriods: {}
      }
    }

    tmpCntData.Contract.Terms.Quantity.ContractedUnits = 2000
    tmpCntData.Contract.Terms.Quantity.QuantityType = 'Metric Tons'

    tmpCntData.Contract.Terms.ShipmentPeriods.Shipment = 'March 2018'


    // DONE
    // console.log('tmpCntData: ', tmpCntData)
    this.schemaForm.setFormValues(tmpCntData)
  }

  public setGeneralData(data: { formValues: { contractType: string, counterParty: any }, knownData: any }) {
    console.log('setGeneralData', data)

    const tmpCntData = { ...this.schemaForm.value }

    if (!tmpCntData.Contract) {
      tmpCntData.Contract = {
        ReferenceNumber: undefined,
        Date: undefined,
        Seller: undefined,
        Buyer: undefined
      }
    }

    // tslint:disable-next-line:max-line-length
    tmpCntData.Contract.ReferenceNumber = ((o) => (o && o.seller && o.buyer) ? `${o.seller.sequenceId}-${o.buyer.sequenceId}-${Math.floor((Math.random() + 1) * 100000)}` : '')(data.knownData)
    tmpCntData.Contract.Date = new Date().toString()

    if (!tmpCntData.Contract.Seller) {
      tmpCntData.Contract.Seller = {
        Name: undefined,
        Addresses: {
          Item: undefined
        },
        Telephone: undefined,
        Fax: undefined
      }
    }
    if (!tmpCntData.Contract.Seller.Addresses.Item || tmpCntData.Contract.Seller.Addresses.Item.length === 0) {
      tmpCntData.Contract.Seller.Addresses.Item = [
        {
          AddressStreet1: undefined,
          AddressStreet2: undefined,
          AddressStreet3: undefined,
          Town: undefined
        }
      ]
    }
    tmpCntData.Contract.Seller.Name = data.knownData.seller.companyName
    tmpCntData.Contract.Seller.Addresses.Item[0].AddressStreet1 = data.knownData.seller.address1
    tmpCntData.Contract.Seller.Addresses.Item[0].AddressStreet2 = data.knownData.seller.address2
    tmpCntData.Contract.Seller.Addresses.Item[0].AddressStreet3 = data.knownData.seller.address3
    tmpCntData.Contract.Seller.Addresses.Item[0].Town = data.knownData.seller.city
    tmpCntData.Contract.Seller.Telephone = data.knownData.seller.telephone
    tmpCntData.Contract.Seller.Fax = data.knownData.seller.fax

    if (!tmpCntData.Contract.Buyer) {
      tmpCntData.Contract.Buyer = {
        Name: undefined,
        Addresses: {
          Item: undefined
        },
        Telephone: undefined,
        Fax: undefined
      }
    }
    if (!tmpCntData.Contract.Buyer.Addresses.Item || tmpCntData.Contract.Buyer.Addresses.Item.length === 0) {
      tmpCntData.Contract.Buyer.Addresses.Item = [
        {
          AddressStreet1: undefined,
          AddressStreet2: undefined,
          AddressStreet3: undefined,
          Town: undefined
        }
      ]
    }
    tmpCntData.Contract.Buyer.Name = data.knownData.buyer.companyName
    tmpCntData.Contract.Buyer.Addresses.Item[0].AddressStreet1 = data.knownData.buyer.address1
    tmpCntData.Contract.Buyer.Addresses.Item[0].AddressStreet2 = data.knownData.buyer.address2
    tmpCntData.Contract.Buyer.Addresses.Item[0].AddressStreet3 = data.knownData.buyer.address3
    tmpCntData.Contract.Buyer.Addresses.Item[0].Town = data.knownData.buyer.city
    tmpCntData.Contract.Buyer.Telephone = data.knownData.buyer.telephone
    tmpCntData.Contract.Buyer.Fax = data.knownData.buyer.fax

    this.schemaForm.setFormValues(tmpCntData)
  }

}

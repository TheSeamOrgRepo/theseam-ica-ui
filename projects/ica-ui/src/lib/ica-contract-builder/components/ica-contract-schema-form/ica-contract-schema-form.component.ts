import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core'
import { JsonSchemaFormComponent, JsonPointer } from 'angular6-json-schema-form'
import { combineLatest } from 'rxjs'
import { switchMap, map, takeWhile, filter, distinctUntilChanged, tap } from 'rxjs/operators'

import { IContractTemplatePack } from '../../models/ica-contract-builder.models'
import { IcaConstractSchemaFormService } from '../../services/ica-constract-schema-form.service'
import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'
import { IcaCommonService } from '../../../common/index'
import { IcaModalContractCompleteService } from './../../../ica-modal-contract-complete/services/ica-modal-contract-complete.service'
import { IIcaJsfRemainingStatus } from '../../models/ica-contract-builder.models'
import { IcaJsfExtraDirective } from '../../directives/ica-jsf-extra.directive'
import { IcaModalContractSignService } from '../../../ica-modal-contract-sign/index'


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
import { IcaSchemaFormContractTypeWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-contract-type-widget/ica-schema-form-contract-type-widget.component'
import { IcaSchemaFormRootWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-root-widget/ica-schema-form-root-widget.component'
import { IcaSchemaFormRootAddReferenceWidgetComponent } from '../../../ica-contract-form-widgets/ica-schema-form-root-add-reference-widget/ica-schema-form-root-add-reference-widget.component'
// tslint:enable:max-line-length

@Component({
  selector: 'ica-contract-schema-form',
  templateUrl: './ica-contract-schema-form.component.html',
  providers: [ IcaConstractSchemaFormService ]
})
export class IcaContractSchemaFormComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() contractTemplatePack: IContractTemplatePack

  @Output() dataChange = new EventEmitter<object>()
  @Output() formSubmit = new EventEmitter<any>()
  @Output() isValid = new EventEmitter<boolean>()

  @ViewChild(JsonSchemaFormComponent) schemaForm: JsonSchemaFormComponent
  @ViewChild(IcaJsfExtraDirective) jsfExtra: IcaJsfExtraDirective

  private generalData: any

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
    'select': IcaSchemaFormSelectInputWidgetComponent,
    'contract-type': IcaSchemaFormContractTypeWidgetComponent,
    'root': IcaSchemaFormRootWidgetComponent,
    '$ref': IcaSchemaFormRootAddReferenceWidgetComponent
  }

  sub: any
  _sub: any

  constructor(
    public icaCntForm: IcaConstractSchemaFormService,
    public icaCntBuilder: IcaContractBuilderService,
    public icaCommon: IcaCommonService,
    public icaModalContractComplete: IcaModalContractCompleteService,
    public icaModalContractSign: IcaModalContractSignService
  ) { }

  ngOnInit() {
    const generalValues$ = combineLatest(
      this.icaCntForm.counterParty$,
      this.icaCntForm.contractType$
    ).pipe(map(([counterParty, contractType]) => ({ counterParty, contractType })))

    const companies$ = this.icaCommon.companies$
    const appUsersCompany$ = this.icaCommon.appUserCompany$

    const formValues$ = generalValues$
      // .pipe(tap(v => console.log('generalValues$', v)))
      .pipe(takeWhile(val => val !== undefined))
      .pipe(filter(val => val.contractType !== undefined))
      .pipe(filter(val => val.counterParty !== undefined))
      .pipe(distinctUntilChanged((before, after) => {
        return (before.contractType === after.contractType) &&
          (before.counterParty === after.counterParty)
      }))
      .pipe(
        // tap(v => console.log('formVals', v)),
        switchMap(formVals =>
          companies$
            // .pipe(tap(v => console.log('companies$', v)))
            .pipe(map(companies => {
              const contractType = ['Sell', 'Purchase']
                .find(t => t === formVals.contractType)
              // console.log('contractType', contractType)

              // console.log('companies', companies)
              // console.log('formVals.counterParty', formVals.counterParty)
              // const counterParty = companies
              //   .find(c => c.companyName === formVals.counterParty)
              const counterParty = formVals.counterParty
              // console.log('counterParty', counterParty)

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
        // tap(v => console.log('formValues$', v)),
        switchMap(formValues => {
          return appUsersCompany$
            // .pipe(tap(v => console.log('appUsersCompany$', v)))
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
        // console.log('val', val)
        // this.createContractService.setKnownTemplateData(val.knownData)
        // this.formDataNew.emit(val.formValues)
        this.setGeneralData(val)
      })

    this.icaModalContractSign.newSignature.subscribe(sig => {
      this.setValue('/Contract/SellerSignature', sig)
      this.icaCntBuilder.setSignedStatus(true)
    })
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe() }
  }

  public onRemainingStatus(remainingStatus: IIcaJsfRemainingStatus) {
    // console.log('remainingStatus', remainingStatus)
    this.icaCntBuilder.setRemainingFieldsStatus(remainingStatus)
  }

  public schemaFormOnChange(formData: object) {
    // console.log('schemaFormOnChange', formData)
    const knownData = (this.generalData && this.generalData.knownData) ? this.generalData.knownData : undefined
    this.dataChange.emit({ schemaData: formData, generalData: knownData })
  }

  public schemaFormIsValid(isValid: boolean) {
    // console.log('schemaFormIsValid', isValid)
    this.isValid.emit(isValid)
  }

  public schemaFormOnSubmit(schemaData: any) {
    // console.log('[IcaContractSchemaFormComponent] schemaFormOnSubmit', schemaData)
    this.formSubmit.emit(schemaData)
  }

  public focusField(field: string) {
    this.jsfExtra.focusField(field)
  }

  public prefillSchemaData() {
    let formValues = { ... this.schemaForm.value }
    formValues = JsonPointer.setCopy(formValues, '/Contract/Specifications/CropYear', '2018')
    formValues = JsonPointer.setCopy(formValues, '/Contract/Pricing/PriceType', 'On Call')
    formValues = JsonPointer.setCopy(formValues, '/Contract/Pricing/UnitPrice', 87.50)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Pricing/PriceBase', 'c/lb')
    formValues = JsonPointer.setCopy(formValues, '/Contract/Terms/Quantity/ContractedUnits', 2000)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Terms/Quantity/QuantityType', 'Metric Tons')
    formValues = JsonPointer.setCopy(formValues, '/Contract/Terms/ShipmentPeriods/Shipment', 'March 2018')
    this.schemaForm.setFormValues(formValues)
  }

  public setGeneralData(data: { formValues: { contractType: string, counterParty: any }, knownData: any }) {
    this.generalData = data

    let formValues = { ... this.schemaForm.value }
    // tslint:disable-next-line:max-line-length
    formValues = JsonPointer.setCopy(formValues, '/Contract/ReferenceNumber', ((o) => (o && o.seller && o.buyer) ? `${o.seller.sequenceId}-${o.buyer.sequenceId}-${Math.floor((Math.random() + 1) * 100000)}` : '')(data.knownData))
    formValues = JsonPointer.setCopy(formValues, '/Contract/Date', new Date().toString())

    formValues = JsonPointer.setCopy(formValues, '/Contract/Seller/Name', data.knownData.seller.companyName)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Seller/Addresses/Item/0/AddressStreet1', data.knownData.seller.address1)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Seller/Addresses/Item/0/AddressStreet2', data.knownData.seller.address2)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Seller/Addresses/Item/0/AddressStreet3', data.knownData.seller.address3)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Seller/Addresses/Item/0/Town', data.knownData.seller.city)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Seller/Telephone', data.knownData.seller.telephone)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Seller/Fax', data.knownData.seller.fax)

    formValues = JsonPointer.setCopy(formValues, '/Contract/Buyer/Name', data.knownData.buyer.companyName)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Buyer/Addresses/Item/0/AddressStreet1', data.knownData.buyer.address1)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Buyer/Addresses/Item/0/AddressStreet2', data.knownData.buyer.address2)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Buyer/Addresses/Item/0/AddressStreet3', data.knownData.buyer.address3)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Buyer/Addresses/Item/0/Town', data.knownData.buyer.city)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Buyer/Telephone', data.knownData.buyer.telephone)
    formValues = JsonPointer.setCopy(formValues, '/Contract/Buyer/Fax', data.knownData.buyer.fax)

    this.schemaForm.setFormValues(formValues)
  }

  public setValue(dataPointer: string, value: any): void {
    const formValues = JsonPointer.setCopy(this.schemaForm.value, dataPointer, value)
    this.schemaForm.setFormValues(formValues)
  }

}

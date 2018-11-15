import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { IcaModalContractSignService } from '../../../ica-modal-contract-sign'

import { IIcaJsfRemainingStatus } from '../../models/ica-contract-builder.models'
import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'

@Component({
  selector: 'ica-contract-builder-top-bar',
  templateUrl: './ica-contract-builder-top-bar.component.html',
  styleUrls: ['./ica-contract-builder-top-bar.component.scss']
})
export class IcaContractBuilderTopBarComponent implements OnInit {

  // tslint:disable
  tmpRemaining = [
    {
      "title": "Counter Party",
      "pointer": "/Contract/Seller/Name",
      "remaining": true
    },
    {
      "title": "Counter Party",
      "pointer": "/Contract/Buyer/Name",
      "remaining": true
    },
    {
      "title": "Crop Year",
      "pointer": "/Contract/Specifications/CropYear",
      "remaining": true
    },
    {
      "title": "Price type",
      "pointer": "/Contract/Pricing/PriceType",
      "remaining": true
    },
    {
      "title": "Unit Price",
      "pointer": "/Contract/Pricing/UnitPrice",
      "remaining": true
    },
    {
      "title": "Price base",
      "pointer": "/Contract/Pricing/PriceBase",
      "remaining": true
    },
    {
      "title": "Contracted units",
      "pointer": "/Contract/Terms/Quantity/ContractedUnits",
      "remaining": false
    },
    {
      "title": "Quantity type",
      "pointer": "/Contract/Terms/Quantity/QuantityType",
      "remaining": true
    },
    {
      "title": "Shipment Periods",
      "pointer": "/Contract/Terms/ShipmentPeriods",
      "remaining": true
    },
    {
      "title": "Name",
      "pointer": "/Contract/Buyer/Name",
      "remaining": true
    },
    {
      "title": "Company Name",
      "pointer": "/Contract/Seller/Name",
      "remaining": true
    }
  ]
  // tslint:enable

  public remainingStatus$: Observable<IIcaJsfRemainingStatus>
  public fieldsCompleted$: Observable<number>
  public fieldsRequired$: Observable<number>
  public completedPercent$: Observable<number>
  public canSign$: Observable<boolean>

  constructor(
    public icaCntBuilder: IcaContractBuilderService,
    public icaModalContractSign: IcaModalContractSignService
  ) {
    this.remainingStatus$ = this.icaCntBuilder.remainingFieldsStatus$

    this.fieldsCompleted$ = this.remainingStatus$.pipe(
      map(s => s.required - s.remaining)
    )

    this.fieldsRequired$ = this.remainingStatus$.pipe(
      map(s => s.required)
    )

    this.completedPercent$ = this.remainingStatus$.pipe(
      map(s => ((s.required - s.remaining) / s.required) * 100),
      map(p => (isNaN(p)) ? 0 : p),
    )

    this.canSign$ = this.completedPercent$.pipe(
      map(completedPercent => completedPercent === 100)
    )
  }

  ngOnInit() {
  }

  onClickSign(event: any) {
    console.log('onClickSign', event)
    this.icaModalContractSign.open()
  }

}

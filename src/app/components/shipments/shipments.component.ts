import { Component, OnInit } from '@angular/core'

import { IcaTableHeaderColumnItem, IcaTableRowColumnItem } from '@theseam/ica-ui'

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {

  public shipmentsTableColumns: IcaTableHeaderColumnItem[] = [
    { name: 'shpmnt', label: 'Shipment' },
    { name: 'cnt', label: 'Contract' },
    { name: 'orig', label: 'Origin' },
    { name: 'dest', label: 'Destination' },
    { name: 'carr', label: 'Carrier' },
    { name: 'creatr', label: 'Creator' },
    { name: 'ownr', label: 'Owner' },
    { name: 'date', label: 'Date' }
  ]

  public shipmentsTableRows: Array<IcaTableRowColumnItem[]> = [
    [
      { name: 'shpmnt', label: '123456' },
      { name: 'cnt', label: '501135-501132-171119' },
      { name: 'orig', label: 'Memphis, TN' },
      { name: 'dest', label: 'Laredo, TX' },
      { name: 'carr', label: 'Southeaster Freight' },
      { name: 'creatr', label: 'Test User' },
      { name: 'ownr', label: 'Allendberg Cotton Co' },
      { name: 'date', label: '06/23/18' }
    ],
    [
      { name: 'shpmnt', label: '123456' },
      { name: 'cnt', label: '501135-501132-171119' },
      { name: 'orig', label: 'Memphis, TN' },
      { name: 'dest', label: 'Laredo, TX' },
      { name: 'carr', label: 'Southeaster Freight' },
      { name: 'creatr', label: 'Test User' },
      { name: 'ownr', label: 'Allendberg Cotton Co' },
      { name: 'date', label: '06/23/18' }
    ],
    [
      { name: 'shpmnt', label: '123456' },
      { name: 'cnt', label: '501135-501132-171119' },
      { name: 'orig', label: 'Memphis, TN' },
      { name: 'dest', label: 'Laredo, TX' },
      { name: 'carr', label: 'Southeaster Freight' },
      { name: 'creatr', label: 'Test User' },
      { name: 'ownr', label: 'Allendberg Cotton Co' },
      { name: 'date', label: '06/23/18' }
    ]
  ]

  constructor() { }

  ngOnInit() {
  }

}

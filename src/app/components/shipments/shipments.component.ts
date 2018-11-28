import { Component, OnInit } from '@angular/core'

import { IcaTableColumn } from '@theseam/ica-ui'

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {

  public shipmentsTableColumns: IcaTableColumn[] = [
    { prop: 'shpmnt', name: 'Shipment' },
    { prop: 'cnt', name: 'Contract' },
    { prop: 'orig', name: 'Origin' },
    { prop: 'dest', name: 'Destination' },
    { prop: 'carr', name: 'Carrier' },
    { prop: 'ownr', name: 'Owner' },
    { prop: 'date', name: 'Date' }
  ]

  public shipmentsTableRows = [
    {
      shpmnt: '123456',
      cnt: '501135-501132-171119',
      orig: 'Memphis, TN',
      dest: 'Laredo, TX',
      carr: 'Southeaster Freight',
      ownr: 'Allendberg Cotton Co',
      date: '06/23/18'
    },
    {
      shpmnt: '123456',
      cnt: '501135-501132-171119',
      orig: 'Memphis, TN',
      dest: 'Laredo, TX',
      carr: 'Southeaster Freight',
      ownr: 'Allendberg Cotton Co',
      date: '06/23/18'
    },
    {
      shpmnt: '123456',
      cnt: '501135-501132-171119',
      orig: 'Memphis, TN',
      dest: 'Laredo, TX',
      carr: 'Southeaster Freight',
      ownr: 'Allendberg Cotton Co',
      date: '06/23/18'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}

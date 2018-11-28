import { Component, OnInit } from '@angular/core'

import { IcaTableColumn } from '@theseam/ica-ui'

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {

  public contractsTableColumns: IcaTableColumn[] = [
    { prop: 'refNum', name: 'Reference Number' },
    { prop: 'countPart', name: 'Counterparty' },
    { prop: 'typ', name: 'Type' },
    { prop: 'quant', name: 'Quantity' },
    { prop: 'price', name: 'Price' },
    { prop: 'shDate', name: 'Shipment Date' },
    { prop: 'stat', name: 'Status' }
  ]

  public contractsTableRows = [
    {
      refNum: '501135-501132-171119',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Closed'
    },
    {
      refNum: '501135-501132-171119',
      countPart: 'Allenberg Cotton Co',
      typ: 'Purchase',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Pending'
    }
  ]

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

  public documentsTableColumns: IcaTableColumn[] = [
    { prop: 'file', name: 'File' },
    { prop: 'fldr', name: 'Reference' },
    { prop: 'auth', name: 'Author' },
    { prop: 'ownr', name: 'Owner' },
    { prop: 'date', name: 'Date' },
    { prop: 'size', name: 'Size' },
  ]

  public documentsTableRows = [
    {
      file: '501135-501132-171119.pdf',
      fldr: 'Contract 501135-501132-171119',
      auth: 'Mark Berry',
      ownr: 'Allenberg Cotton Co',
      date: '06/23/18 5:55 PM',
      size: '50 KB',
    },
    {
      file: '501135-501132-171119.json',
      fldr: 'Contract 501135-501132-171119',
      auth: 'Mark Berry',
      ownr: 'Allenberg Cotton Co',
      date: '06/23/18 5:55 PM',
      size: '876 Bytes',
    },
    {
      file: '501135-501132-171119.pdf',
      fldr: 'Contract 501135-501132-171119',
      auth: 'Mark Berry',
      ownr: 'Allenberg Cotton Co',
      date: '06/23/18 5:55 PM',
      size: '50 KB',
    },
    {
      file: '501135-501132-171119.pdf',
      fldr: 'Contract 501135-501132-171119',
      auth: 'Mark Berry',
      ownr: 'Allenberg Cotton Co',
      date: '06/23/18 5:55 PM',
      size: '600 Bytes',
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}

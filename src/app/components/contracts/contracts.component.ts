import { Component, OnInit } from '@angular/core'

import { IcaTableHeaderColumnItem, IcaTableRowColumnItem, IcaModalFilePreviewService, IRowAction, IcaTableColumn } from '@theseam/ica-ui'

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  public contractsTableColumns: IcaTableColumn[] = [
    { prop: 'refNum', name: 'Reference Number' },
    { prop: 'blkStat', name: 'Blockchain Status' },
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
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Up to date',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Closed'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Purchase',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Pending'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Purchase',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Purchase',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Purchase',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Pending'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Pending'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Purchase',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Pending'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Closed'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Closed'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Active'
    },
    {
      refNum: '501135-501132-171119',
      blkStat: 'Syncing',
      countPart: 'Allenberg Cotton Co',
      typ: 'Sale',
      quant: '1000 Metric Tons',
      price: '87.5 c/lb',
      shDate: '06/23/18',
      stat: 'Pending'
    }
  ]

  constructor(
    private icaModalFilePreview: IcaModalFilePreviewService
  ) { }

  ngOnInit() {
  }

  onRowAction(rowAction: IRowAction) {
    console.log('rowAction~', rowAction)
    // this.icaModalFilePreview.open()
  }

}

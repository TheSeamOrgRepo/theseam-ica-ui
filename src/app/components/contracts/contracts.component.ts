import { Component, OnInit } from '@angular/core'

import { IcaTableHeaderColumnItem, IcaTableRowColumnItem, IcaModalFilePreviewService, IRowAction } from '@theseam/ica-ui'

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  public contractsTableColumns: IcaTableHeaderColumnItem[] = [
    { name: 'refNum', label: 'Reference Number' },
    { name: 'blkStat', label: 'Blockchain Status' },
    { name: 'countPart', label: 'Counterparty' },
    { name: 'typ', label: 'Type' },
    { name: 'quant', label: 'Quantity' },
    { name: 'price', label: 'Price' },
    { name: 'shDate', label: 'Shipment Date' },
    { name: 'stat', label: 'Status' }
  ]

  public contractsTableRows: Array<IcaTableRowColumnItem[]> = [
    [
      { name: 'refNum', label: '501135-501132-171119' },
      { name: 'blkStat', label: 'Syncing' },
      { name: 'countPart', label: 'Allenberg Cotton Co' },
      { name: 'typ', label: 'Sale' },
      { name: 'quant', label: '1000 Metric Tons' },
      { name: 'price', label: '87.5 c/lb' },
      { name: 'shDate', label: '06/23/18' },
      { name: 'stat', label: 'Active', cssClass: 'active' }
    ],
    [
      { name: 'refNum', label: '501135-501132-171119' },
      { name: 'blkStat', label: 'Up to date' },
      { name: 'countPart', label: 'Allenberg Cotton Co' },
      { name: 'typ', label: 'Sale' },
      { name: 'quant', label: '1000 Metric Tons' },
      { name: 'price', label: '87.5 c/lb' },
      { name: 'shDate', label: '06/23/18' },
      { name: 'stat', label: 'Closed', cssClass: 'closed' }
    ],
    [
      { name: 'refNum', label: '501135-501132-171119' },
      { name: 'blkStat', label: 'Syncing' },
      { name: 'countPart', label: 'Allenberg Cotton Co' },
      { name: 'typ', label: 'Purchase' },
      { name: 'quant', label: '1000 Metric Tons' },
      { name: 'price', label: '87.5 c/lb' },
      { name: 'shDate', label: '06/23/18' },
      { name: 'stat', label: 'Active', cssClass: 'active' }
    ],
    [
      { name: 'refNum', label: '501135-501132-171119' },
      { name: 'blkStat', label: 'Syncing' },
      { name: 'countPart', label: 'Allenberg Cotton Co' },
      { name: 'typ', label: 'Sale' },
      { name: 'quant', label: '1000 Metric Tons' },
      { name: 'price', label: '87.5 c/lb' },
      { name: 'shDate', label: '06/23/18' },
      { name: 'stat', label: 'Pending', cssClass: 'pending' }
    ]
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

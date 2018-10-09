import { Component, OnInit } from '@angular/core'

import { IcaTableHeaderColumnItem, IcaTableRowColumnItem } from '@theseam/ica-ui'

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {

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

  public documentsTableColumns: IcaTableHeaderColumnItem[] = [
    { name: 'file', label: 'File' },
    { name: 'fldr', label: 'Folder' },
    { name: 'auth', label: 'Author' },
    { name: 'ownr', label: 'Owner' },
    { name: 'date', label: 'Date' },
    { name: 'size', label: 'Size' },
    { name: 'secStat', label: 'Security Status' },
    { name: 'shrg', label: 'Sharing' },
    { name: 'fng', label: 'Fingerprint' },
  ]

  public documentsTableRows: Array<IcaTableRowColumnItem[]> = [
    [
      { name: 'file', label: '501135-501132-171119.pdf' },
      { name: 'fldr', label: 'Contract 501135-501132-171119' },
      { name: 'auth', label: 'Mark Berry' },
      { name: 'ownr', label: 'Allenberg Cotton Co' },
      { name: 'date', label: '06/23/18 5:55 PM' },
      { name: 'size', label: '50 KB' },
      { name: 'secStat', label: 'Encrypted' },
      { name: 'shrg', label: '' },
      { name: 'fng', label: 'QdgrRshGS44sFSh6782Sfs' },
    ],
    [
      { name: 'file', label: '501135-501132-171119.json' },
      { name: 'fldr', label: 'Contract 501135-501132-171119' },
      { name: 'auth', label: 'Mark Berry' },
      { name: 'ownr', label: 'Allenberg Cotton Co' },
      { name: 'date', label: '06/23/18 5:55 PM' },
      { name: 'size', label: '876 Bytes' },
      { name: 'secStat', label: 'Encrypted' },
      { name: 'shrg', label: '' },
      { name: 'fng', label: 'QdgrRshGS44sFSh6782Sfs' },
    ],
    [
      { name: 'file', label: '501135-501132-171119.pdf' },
      { name: 'fldr', label: 'Contract 501135-501132-171119' },
      { name: 'auth', label: 'Mark Berry' },
      { name: 'ownr', label: 'Allenberg Cotton Co' },
      { name: 'date', label: '06/23/18 5:55 PM' },
      { name: 'size', label: '50 KB' },
      { name: 'secStat', label: 'Encrypted' },
      { name: 'shrg', label: 'Yes' },
      { name: 'fng', label: 'QdgrRshGS44sFSh6782Sfs' },
    ],
    [
      { name: 'file', label: '501135-501132-171119.pdf' },
      { name: 'fldr', label: 'Contract 501135-501132-171119' },
      { name: 'auth', label: 'Mark Berry' },
      { name: 'ownr', label: 'Allenberg Cotton Co' },
      { name: 'date', label: '06/23/18 5:55 PM' },
      { name: 'size', label: '600 Bytes' },
      { name: 'secStat', label: 'Encrypted' },
      { name: 'shrg', label: 'Yes' },
      { name: 'fng', label: 'QdgrRshGS44sFSh6782Sfs' },
    ]
  ]

  constructor() { }

  ngOnInit() {
  }

}

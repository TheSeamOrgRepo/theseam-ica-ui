import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'ica-contracts',
  templateUrl: './ica-contracts.component.html',
  styleUrls: ['./ica-contracts.component.scss']
})
export class IcaContractsComponent implements OnInit {

  @Input() contractsTableColumns
  @Input() contractsTableRows

  constructor() { }

  ngOnInit() {
  }

}

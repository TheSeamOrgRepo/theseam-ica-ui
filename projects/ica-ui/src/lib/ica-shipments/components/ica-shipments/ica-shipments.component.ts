import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'ica-shipments',
  templateUrl: './ica-shipments.component.html',
  styleUrls: ['./ica-shipments.component.scss']
})
export class IcaShipmentsComponent implements OnInit {

  @Input() shipmentsTableColumns
  @Input() shipmentsTableRows

  constructor() { }

  ngOnInit() {
  }

}

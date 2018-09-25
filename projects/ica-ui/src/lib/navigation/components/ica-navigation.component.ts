import { Component, OnInit } from '@angular/core'

import { IcaNavigationService } from './../services/ica-navigation.service'

@Component({
  selector: 'ica-navigation',
  templateUrl: './ica-navigation.component.html',
  styles: []
})
export class IcaNavigationComponent implements OnInit {

  accountDrawerOpen = false

  constructor(
    public icaNavigationService: IcaNavigationService
  ) { }

  ngOnInit() {
  }

}

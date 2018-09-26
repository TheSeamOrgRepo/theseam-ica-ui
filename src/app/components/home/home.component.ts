import { Component, OnInit } from '@angular/core'

import { IcaNavigationService, IcaLoginService } from '@theseam/ica-ui'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public icaNavigationService: IcaNavigationService,
    public icaLoginService: IcaLoginService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.icaLoginService.setLoggedInStateState(true)
    })
  }

}

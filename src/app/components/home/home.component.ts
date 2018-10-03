import { Component, OnInit } from '@angular/core'

import { IcaNavigationService } from '@theseam/ica-ui'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public icaNavigationService: IcaNavigationService
  ) { }

  ngOnInit() { }

}

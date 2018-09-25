import { Component, OnInit } from '@angular/core'

import { IcaLoginService } from '@theseam/ica-ui'

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  constructor(
    public icaLoginService: IcaLoginService
  ) { }

  ngOnInit() {
  }

}

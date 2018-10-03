import { Component, OnInit } from '@angular/core'

import { trigger, query, transition, animateChild } from '@angular/animations'

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', animateChild(), {optional: true})
  ])
])

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  animations: [ routerTransition ]
})
export class MainContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getState(outlet) {
    return outlet.activatedRouteData.state
  }

}

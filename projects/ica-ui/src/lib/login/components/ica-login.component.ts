import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { trigger, animate, style, query, transition } from '@angular/animations'

export const loginTransition = trigger('loginTransition', [
  transition(':enter', [
    query('.login__left', [
      style({ transform: 'translateX(-100%)' }),
      animate('500ms ease-in-out', style({ transform: 'translateX(0%)' }))
    ], {optional: true}),
  ]),
  transition(':leave', [
    query('.login__left', [
      style({ transform: 'translateX(0%)' }),
      animate('500ms ease-in-out', style({ transform: 'translateX(-100%)' }))
    ], {optional: true}),
  ])
])

import { IcaLoginService } from './../services/ica-login.service'

@Component({
  selector: 'ica-login',
  templateUrl: './ica-login.component.html',
  styles: [],
  animations: [ loginTransition ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@loginTransition]': ''
  }
})
export class IcaLoginComponent implements OnInit {

  passwordVisible = false
  activeAction = 'main'
  outAction = ''
  email = ''

  @ViewChild('emailInput') emailInput: ElementRef
  @ViewChild('passwordInput') passwordInput: ElementRef

  constructor(
    public router: Router,
    public icaLoginService: IcaLoginService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.icaLoginService.setLoggedInStateState(false)
    })
  }

  setAction(name: string) {
    this.outAction = this.activeAction
    setTimeout(() => { this.outAction = '' }, 500)

    setTimeout(() => {
      this.activeAction = name
      if (this.activeAction === 'main') {
        setTimeout(() => { this.emailInput.nativeElement.focus() }, 500)
      }
      if (this.activeAction === 'email') {
        setTimeout(() => { this.passwordInput.nativeElement.focus() }, 500)
      }
    }, 500)
  }

  login() {
    this.activeAction = 'login'
    setTimeout(() => {
      // this.icaLoginService.setLoggedInStateState(true)
      this.router.navigate(['/home'])
    }, 500)
  }

}

import { Component, OnInit, ViewChild, ElementRef, Inject, Optional } from '@angular/core'
import { Router } from '@angular/router'
import { trigger, animate, style, query, transition } from '@angular/animations'

import { IcaLoginAuthService, IcaLoginAuth } from './../ica-login.models'

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
  isEditingEmail = false
  activeAction = 'main'
  outAction = ''
  uPortInAction = false

  email = ''
  password = ''

  @ViewChild('emailInput') emailInput: ElementRef
  @ViewChild('emailInput2') emailInput2: ElementRef
  @ViewChild('passwordInput') passwordInput: ElementRef

  constructor(
    public router: Router,
    public icaLoginService: IcaLoginService,
    @Optional() @Inject(IcaLoginAuthService) public icaLoginAuthService: IcaLoginAuth
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.icaLoginService.setLoggedInStateState(false)
    })
  }

  setAction(name: string) {
    this.outAction = this.activeAction
    setTimeout(() => { this.outAction = '' }, 500)
    if (name === 'uport') { this.uPortInAction = true } else { this.uPortInAction = false }

    setTimeout(() => {
      this.activeAction = name
      if (this.activeAction === 'main') {
        this.isEditingEmail = false
        setTimeout(() => { this.emailInput.nativeElement.focus() }, 500)
      }
      if (this.activeAction === 'email') {
        setTimeout(() => { this.passwordInput.nativeElement.focus() }, 500)
      }
    }, 500)
  }

  enableEmailEditing() {
    this.isEditingEmail = true
    setTimeout(() => { this.emailInput2.nativeElement.focus() }, 500)
  }

  login() {
    this.activeAction = 'login'

    console.log('email', this.email)
    console.log('password', this.password)

    setTimeout(() => {
      // this.icaLoginService.setLoggedInStateState(true)
      this.router.navigate(['/home'])
    }, 500)
  }

  emailEnterOnKeyUp(event: any) {
    // console.log('onEmailEnterKeyPress', event)
    // Check if email is valid
    // this.setAction('email')
    this.verifyEmail()
  }

  emailButtonOnClick(event: any) {
    // Check if email is valid
    // this.setAction('email')
    this.verifyEmail()
  }

  verifyEmail() {
    console.log('email', this.email)
    if (this.icaLoginAuthService !== null) {
      this.icaLoginAuthService.isEmailValid(this.email)
        .subscribe(result => {
          if (result.valid) {
            this.setAction('email')
          } else {
            // Display email error
          }
        })
    }
  }

}

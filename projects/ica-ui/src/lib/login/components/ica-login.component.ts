import { Component, OnInit, ViewChild, ElementRef, Inject, Optional, HostBinding } from '@angular/core'
import { Router } from '@angular/router'
import { trigger, animate, style, query, transition } from '@angular/animations'
import { tap } from 'rxjs/operators'

import { IcaLoginAuthService, IcaLoginAuth, IcaLoginValidEmailResult, IcaLoginAuthResult } from './../ica-login.models'

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

@Component({
  selector: 'ica-login',
  templateUrl: './ica-login.component.html',
  animations: [ loginTransition ]
})
export class IcaLoginComponent implements OnInit {

  @HostBinding('@loginTransition') loginTransition

  passwordVisible = false
  isEditingEmail = false
  activeAction = 'main'
  outAction = ''
  uPortInAction = false

  email = ''
  password = ''

  emailValidResult: IcaLoginValidEmailResult
  authResult: IcaLoginAuthResult

  @ViewChild('emailInput') emailInput: ElementRef
  @ViewChild('emailInput2') emailInput2: ElementRef
  @ViewChild('passwordInput') passwordInput: ElementRef

  constructor(
    public router: Router,
    @Optional() @Inject(IcaLoginAuthService) public icaLoginAuthService: IcaLoginAuth
  ) { }

  ngOnInit() { }

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
    if (this.email.trim() === '' && this.password.trim() === '') { return }
    // this.activeAction = 'login' // Not needed with route transition

    console.log('email', this.email)
    console.log('password', this.password)

    if (this.icaLoginAuthService !== null) {
      this.icaLoginAuthService.authenticate(this.email, this.password)
        .pipe(tap(result => this.authResult = result))
        .subscribe(result => {
          console.log('result', result)
          if (result.success) {
            setTimeout(() => {
              this.router.navigate(['contracts'])
            }, 500)
          }
        })
    }
  }

  verifyEmail() {
    if (this.email.trim() === '') { return }

    // Not sure if there is a way to display this currently
    // if (this.icaLoginAuthService !== null) {
    //   this.icaLoginAuthService.isEmailValid(this.email)
    //     .pipe(tap(result => this.emailValidResult = result))
    //     .subscribe(result => {
    //       if (result.valid) {
    //         this.setAction('email')
    //       }
    //     })
    // }

    this.setAction('email')
  }

}

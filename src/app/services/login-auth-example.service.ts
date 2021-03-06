import { Injectable } from '@angular/core'
import { IcaLoginAuth, IcaLoginValidEmailResult, IcaLoginAuthResult } from '@theseam/ica-ui'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginAuthExampleService implements IcaLoginAuth {

  private isAuthenticatingService = new BehaviorSubject<boolean>(false)
  isAuthenticating$ = this.isAuthenticatingService.asObservable()

  constructor() { }

  isEmailValid(email: string): Observable<IcaLoginValidEmailResult> {
    if (email === 'test@example.com') {
      return of({
        valid: true,
        message: ''
      })
    }

    return of({
      valid: false,
      message: `Email ${email} already exists.`
    })
  }

  authenticate(email: string, password: string): Observable<IcaLoginAuthResult> {
    this.isAuthenticatingService.next(false)

    if (email === 'tester@example.com' && password === 'test1324') {
      return of({
        success: true,
        message: ''
      }).pipe(tap(_ => this.isAuthenticatingService.next(false)))
    }

    return of({
      success: false,
      message: `The password you entered is incorrect.`
    }).pipe(tap(_ => this.isAuthenticatingService.next(false)))
  }

  getUportQrUri(): Observable<string> {
    return of('')
  }

  authenticateUport(): Observable<IcaLoginAuthResult> {
    return of({
      success: true,
      message: ''
    })
  }

  logout(): Observable<boolean> {
    return of(true)
  }

}

import { Observable } from 'rxjs'
import { InjectionToken } from '@angular/core'

// NOTE: These result interfaces will probably be replaced with booleans and
//  throwing the messages as errors.
export interface IcaLoginAuthResult {
  success: boolean
  message: string
}

export interface IcaLoginValidEmailResult {
  valid: boolean
  message: string
}

export interface IcaLoginAuth {
  isAuthenticating$: Observable<boolean>

  isEmailValid: (email: string) => Observable<IcaLoginValidEmailResult>

  authenticate: (email: string, password: string) => Observable<IcaLoginAuthResult>

  getUportQrUri: () => Observable<string>

  authenticateUport: () => Observable<IcaLoginAuthResult>

  logout: () => Observable<boolean>
}

export const IcaLoginAuthService = new InjectionToken<IcaLoginAuth>('IcaLoginAuth')

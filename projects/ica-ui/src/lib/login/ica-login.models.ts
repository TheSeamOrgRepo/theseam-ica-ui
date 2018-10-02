import { Observable } from 'rxjs'
import { InjectionToken } from '@angular/core'

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
}

export const IcaLoginAuthService = new InjectionToken<IcaLoginAuth>('IcaLoginAuth')

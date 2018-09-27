import { Observable } from 'rxjs'
import { InjectionToken } from '@angular/core'

export interface IcaLoginAuthResult {
  success: boolean
  message: string
}

export interface IcaLoginAuth {
  isAuthenticating$: Observable<boolean>
  authenticate: (username: string, password: string) => IcaLoginAuthResult
}

export const IcaLoginAuthService = new InjectionToken<IcaLoginAuth>('IcaLoginAuth')

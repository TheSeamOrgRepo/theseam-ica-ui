import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class IcaLoginService {

  private _loggedInStateSubject = new BehaviorSubject<boolean>(false)
  public loggedInState = this._loggedInStateSubject.asObservable()

  constructor() { }

  public setLoggedInStateState(state: boolean): void {
    this._loggedInStateSubject.next(state)
  }

}

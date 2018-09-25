import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class IcaNavigationService {

  private _sideNavExpandedSubject = new BehaviorSubject<boolean>(false)
  public sideNavExpanded = this._sideNavExpandedSubject.asObservable()

  constructor() { }

  public setSideNavExpandedState(state: boolean): void {
    this._sideNavExpandedSubject.next(state)
  }

}

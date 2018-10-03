import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class IcaNavigationService {

  private _sideNavExpandedSubject = new BehaviorSubject<boolean>(true)
  public sideNavExpanded = this._sideNavExpandedSubject.asObservable()

  constructor() {
    this._sideNavExpandedSubject.subscribe(isExpanded => {
      if (isExpanded) {
        document.documentElement.classList.add('is-small-nav')
      } else {
        document.documentElement.classList.remove('is-small-nav')
      }
    })
  }

  public setSideNavExpandedState(state: boolean): void {
    this._sideNavExpandedSubject.next(state)
  }

}

import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class IcaCommonService {

  // TODO: Counter parties should not just be provided here generically like this
  private _counterPartiesSubject = new BehaviorSubject<any>([])
  public counterParties$ = this._counterPartiesSubject.asObservable()

  private _companiesSubject = new BehaviorSubject<any>([])
  public companies$ = this._companiesSubject.asObservable()

  private _appUserCompanySubject = new BehaviorSubject<any>([])
  public appUserCompany$ = this._appUserCompanySubject.asObservable()

  constructor() {
    this.counterParties$.subscribe(res => console.log('icaCounterParties', res))
  }

  public setCounterParties(cp: any) {
    this._counterPartiesSubject.next(cp)
  }

  public setCompanies(cp: any) {
    this._companiesSubject.next(cp)
  }

  public setAppUserCompany(cp: any) {
    this._appUserCompanySubject.next(cp)
  }

}

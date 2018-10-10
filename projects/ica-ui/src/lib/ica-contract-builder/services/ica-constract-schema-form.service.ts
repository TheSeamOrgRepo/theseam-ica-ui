import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { take } from 'rxjs/operators'

@Injectable()
export class IcaConstractSchemaFormService {

  private _activeWizardPanelSubject = new BehaviorSubject<number>(1)
  public activeWizardPanel$ = this._activeWizardPanelSubject.asObservable()

  private _counterPartySubject = new BehaviorSubject<any>(undefined)
  public counterParty$ = this._counterPartySubject.asObservable()

  private _contractTypeSubject = new BehaviorSubject<any>(undefined)
  public contractType$ = this._contractTypeSubject.asObservable()

  constructor() { }

  public setActiveWizardPanel(index: number) {
    this._activeWizardPanelSubject.next(index)
  }

  public activeWizardPanelIncr(amount: number) {
    this.activeWizardPanel$.pipe(take(1))
      .subscribe(v => this.setActiveWizardPanel(v + amount))
  }

  public activeWizardPanelDecr(amount: number) {
    this.activeWizardPanel$.pipe(take(1))
      .subscribe(v => this.setActiveWizardPanel(v - amount))
  }

  public setCounterParty(cp: any) {
    this._counterPartySubject.next(cp)
  }

  public setContractType(type: string) {
    this._contractTypeSubject.next(type)
  }

}

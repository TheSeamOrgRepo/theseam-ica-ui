import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { take } from 'rxjs/operators'

@Injectable()
export class IcaConstractSchemaFormService {

  private _activeWizardPanelSubject = new BehaviorSubject<number>(1)
  public activeWizardPanel$ = this._activeWizardPanelSubject.asObservable()

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

}

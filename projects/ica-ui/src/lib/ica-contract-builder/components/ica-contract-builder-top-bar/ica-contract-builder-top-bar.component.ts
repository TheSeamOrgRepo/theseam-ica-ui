import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { IIcaJsfRemainingStatus } from '../../models/ica-contract-builder.models'
import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'

@Component({
  selector: 'ica-contract-builder-top-bar',
  templateUrl: './ica-contract-builder-top-bar.component.html',
  styles: []
})
export class IcaContractBuilderTopBarComponent implements OnInit {

  public remainingStatus$: Observable<IIcaJsfRemainingStatus>
  public fieldsCompleted$: Observable<number>
  public fieldsRequired$: Observable<number>
  public completedPercent$: Observable<number>

  constructor(
    public icaCntBuilder: IcaContractBuilderService
  ) {
    this.remainingStatus$ = this.icaCntBuilder.remainingFieldsStatus$

    this.fieldsCompleted$ = this.remainingStatus$.pipe(
      map(s => s.required - s.remaining)
    )

    this.fieldsRequired$ = this.remainingStatus$.pipe(
      map(s => s.required)
    )

    this.completedPercent$ = this.remainingStatus$.pipe(
      map(s => ((s.required - s.remaining) / s.required) * 100),
      map(p => (isNaN(p)) ? 0 : p),
    )
  }

  ngOnInit() {
  }

}

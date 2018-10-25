import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

import { IContractTemplatePack, IContractTemplatePackManifest, IIcaJsfRemainingStatus } from '../models/ica-contract-builder.models'

@Injectable({
  providedIn: 'root'
})
export class IcaContractBuilderService {

  private _remainingFieldsStatus = new BehaviorSubject<IIcaJsfRemainingStatus>({
    remaining: 0,
    required: 0
  })
  public remainingFieldsStatus$ = this._remainingFieldsStatus.asObservable()

  constructor(
    public http: HttpClient
  ) { }

  public downloadContractPack(tplPackManifest: IContractTemplatePackManifest): Observable<IContractTemplatePack> {
    return forkJoin(
      this.http.get<any>(tplPackManifest.schemaUrl),
      this.http.get(tplPackManifest.pdfTplUrl, { responseType: 'text' }),
      this.http.get<any>(tplPackManifest.layoutUrl).pipe(map(value => value.layout)),
    )
    .pipe(map(([formSchema, pdfTpl, formLayout]) => {
      return {
        formSchema,
        pdfTpl,
        formLayout
      }
    }))
  }

  public setRemainingFieldsStatus(status: IIcaJsfRemainingStatus) {
    this._remainingFieldsStatus.next(status)
  }

}

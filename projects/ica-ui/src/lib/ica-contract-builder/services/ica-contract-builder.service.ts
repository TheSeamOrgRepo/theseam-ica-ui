import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

import { IContractTemplatePack, IContractTemplatePackManifest, IIcaJsfRemainingStatus } from '../models/ica-contract-builder.models'

/**
 * NOTE: This service is mainly just for communicating with the top-bar
 * component, but will eventually be merged into the service provided at the
 * contract-builder component level once the top-bar being driven by the router
 * is rolled back.
 */
@Injectable({
  providedIn: 'root'
})
export class IcaContractBuilderService {

  private readonly remainingFieldsStatusDefault = {
    remaining: 0,
    required: 0
  }
  private readonly hasSignedDefault = false

  private _remainingFieldsStatus = new BehaviorSubject<IIcaJsfRemainingStatus>(this.remainingFieldsStatusDefault)
  public _hasSigned = new BehaviorSubject<boolean>(this.hasSignedDefault)

  public remainingFieldsStatus$: Observable<IIcaJsfRemainingStatus>
  public hasSigned$: Observable<boolean>

  constructor(
    public http: HttpClient
  ) {
    this.remainingFieldsStatus$ = this._remainingFieldsStatus.asObservable()
    this.hasSigned$ = this._hasSigned.asObservable()
  }

  public reset() {
    this._remainingFieldsStatus.next(this.remainingFieldsStatusDefault)
    this._hasSigned.next(this.hasSignedDefault)
  }

  /**
   * Downloads a Contract Pack
   *
   * TODO: Allow contract pack caching. Could enforce versioning, by requiring a
   *  manifest file on IPFS. The hash of the manifest file would be the version.
   *  The manifest could also contain a version as maybe a human readable
   *  string, but it would be up to the pack author to mantain it, since it
   *  would not be required to be based on content.
   */
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

  public setSignedStatus(hasSigned: boolean): void {
    this._hasSigned.next(hasSigned)
  }

}

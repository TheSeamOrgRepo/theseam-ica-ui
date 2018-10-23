import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin } from 'rxjs'
import { map } from 'rxjs/operators'

import { IContractTemplatePack, IContractTemplatePackManifest } from '../models/ica-contract-builder.models'

@Injectable({
  providedIn: 'root'
})
export class IcaContractBuilderService {

  constructor(
    public http: HttpClient
  ) { }

  public downloadContractPack(tplPackManifest: IContractTemplatePackManifest): Observable<IContractTemplatePack> {
    return forkJoin(
      this.http.get<any>(tplPackManifest.schemaUrl),
      this.http.get(tplPackManifest.pdfTplUrl, { responseType: 'text' }),
      // this.http.get(tplPackManifest.pdfTplUrl),
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

}

import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { tap, delay } from 'rxjs/operators'
import { Router } from '@angular/router'

import {
  IcaContractBuilderService,
  IContractTemplatePack,
  IContractTemplatePackManifest,
  IcaModalSubmitContractService
} from '@theseam/ica-ui'

@Component({
  selector: 'app-contract-builder',
  templateUrl: './contract-builder.component.html',
  styleUrls: ['./contract-builder.component.scss']
})
export class ContractBuilderComponent implements OnInit {

  public readonly defaultTemplatePack: IContractTemplatePackManifest = {
    name: 'Example Pack',
    version: '0.0.1',
    schemaUrl: 'assets/contract-packs/ica-contract-2/ica-contract-schema.json',
    layoutUrl: 'assets/contract-packs/ica-contract-2/ica-contract-form-layout.json',
    pdfTplUrl: 'assets/contract-packs/ica-contract-2/ica-contract-template.json'
  }

  public contractTplPack: Observable<IContractTemplatePack>

  constructor(
    public router: Router,
    public icaContractBuilder: IcaContractBuilderService,
    public icaModalSubmitContract: IcaModalSubmitContractService
  ) { }

  ngOnInit() {
    this.contractTplPack = this.icaContractBuilder.downloadContractPack(this.defaultTemplatePack)
      .pipe(tap(pack => console.log('pack', pack)))
  }

  public onSubmit(event: any) {
    console.log('[new-contract] onSubmit', event)
    of([]).pipe(
      tap(_ => console.log('Start')),
      tap(_ => this.icaModalSubmitContract.compilingContractDataState = 'loading'),
      delay(1000),
      tap(_ => this.icaModalSubmitContract.compilingContractDataState = 'finished'),
      tap(_ => this.icaModalSubmitContract.generatingPdfDocumentState = 'loading'),
      delay(1000),
      tap(_ => this.icaModalSubmitContract.generatingPdfDocumentState = 'finished'),
      tap(_ => this.icaModalSubmitContract.encryptingContractFilesState = 'loading'),
      delay(1000),
      tap(_ => this.icaModalSubmitContract.encryptingContractFilesState = 'finished'),
      tap(_ => this.icaModalSubmitContract.postingContractToDatabaseState = 'loading'),
      delay(1000),
      tap(_ => this.icaModalSubmitContract.postingContractToDatabaseState = 'finished'),
      tap(_ => this.icaModalSubmitContract.postingContractToBlockchainState = 'loading'),
      delay(1000),
      tap(_ => this.icaModalSubmitContract.postingContractToBlockchainState = 'finished'),
      tap(_ => console.log('Done'))
    ).subscribe()
  }

  public onCompleted() {
    console.log('[new-contract] onCompleted')
    this.router.navigate(['/contracts'])
  }

}

import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { IcaContractBuilderService, IContractTemplatePack, IContractTemplatePackManifest } from '@theseam/ica-ui'

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
    public icaContractBuilder: IcaContractBuilderService
  ) { }

  ngOnInit() {
    this.contractTplPack = this.icaContractBuilder.downloadContractPack(this.defaultTemplatePack)
      .pipe(tap(pack => console.log('pack', pack)))

  }

}

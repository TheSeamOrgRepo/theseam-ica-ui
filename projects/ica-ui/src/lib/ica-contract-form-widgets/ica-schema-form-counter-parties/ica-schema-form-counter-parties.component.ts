import { Component, OnInit, Input } from '@angular/core'
import { JsonSchemaFormService, isArray, buildTitleMap } from 'angular6-json-schema-form'
import { AbstractControl } from '@angular/forms'
import { Observable, from } from 'rxjs'
import { map, tap, switchMap, toArray } from 'rxjs/operators'

import { IcaCommonService } from '../../common'
import { IcaConstractSchemaFormService } from '../../ica-contract-builder/services/ica-constract-schema-form.service'

@Component({
  selector: 'ica-schema-form-counter-parties',
  templateUrl: './ica-schema-form-counter-parties.component.html',
  styleUrls: ['./ica-schema-form-counter-parties.component.scss']
})
export class IcaSchemaFormCounterPartiesComponent implements OnInit {

  formControl: AbstractControl
  controlName: string
  controlValue: any
  controlDisabled = false
  boundControl = false
  options: any
  selectList: any[] = []
  selectList$: Observable<any>
  isArray = isArray
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]

  constructor(
    private jsf: JsonSchemaFormService,
    private icaCommon: IcaCommonService,
    private icaContractSchema: IcaConstractSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {}
    this.selectList = buildTitleMap(
      this.options.titleMap || this.options.enumNames,
      this.options.enum, !!this.options.required, !!this.options.flatList
    )
    // console.log('selectList', this.selectList)
    this.selectList$ = this.icaCommon.counterParties$.pipe(
      switchMap(parties => from(parties).pipe(
        map((cp: any) => ({ name: cp.companyName, value: JSON.stringify(cp) })),
        toArray()
      )),
      map(v => ([ { name: '', value: null }, ...v ])),
      // tap(res => console.log('selectList$', res))
    )
    this.jsf.initializeControl(this)
  }

  updateValue(event) {
    console.log('updateValue cp: ', event.target.value)
    this.icaContractSchema.setCounterParty(JSON.parse(event.target.value))
    this.jsf.updateValue(this, event.target.value)
  }

}

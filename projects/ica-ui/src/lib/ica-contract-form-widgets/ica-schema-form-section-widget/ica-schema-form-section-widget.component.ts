import { Component, OnInit, Input } from '@angular/core'
import { JsonSchemaFormService } from 'angular6-json-schema-form'

@Component({
  selector: 'ica-schema-form-section-widget',
  templateUrl: './ica-schema-form-section-widget.component.html',
  styles: [`
    .no-indent-section {
      padding-left: 0;
    }
    .no-indent-section:before {
      width: 0;
    }
  `]
})
export class IcaSchemaFormSectionWidgetComponent implements OnInit {

  options: any
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  get sectionTitle() {
    return this.options.notitle ? null : this.jsf.setItemTitle(this)
  }

  ngOnInit() {
    this.jsf.initializeControl(this)
    this.options = this.layoutNode.options || {}

    // console.log('IcaSchemaFormSectionWidgetComponent', this)
  }

}

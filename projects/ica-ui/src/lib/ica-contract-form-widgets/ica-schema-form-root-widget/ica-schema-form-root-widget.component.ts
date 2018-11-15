import { Component, Input } from '@angular/core'
import { JsonSchemaFormService } from 'angular6-json-schema-form'

@Component({
  selector: 'ica-schema-form-root-widget',
  templateUrl: './ica-schema-form-root-widget.component.html',
  styleUrls: ['./ica-schema-form-root-widget.component.scss']
})
export class IcaSchemaFormRootWidgetComponent {

  options: any
  @Input() dataIndex: number[]
  @Input() layoutIndex: number[]
  @Input() layout: any[]
  @Input() isOrderable = false // TODO: Figure our how this can be toggled with our layout
  @Input() isFlexItem = false

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  isDraggable(node: any): boolean {
    return node.arrayItem && node.type !== '$ref' &&
      node.arrayItemType === 'list' && this.isOrderable !== false
  }

  // Set attributes for flexbox child
  // (container attributes are set in section.component)
  getFlexAttribute(node: any, attribute: string) {
    const index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute)
    return ((node.options || {}).flex || '').split(/\s+/)[index] ||
      (node.options || {})[attribute] || ['1', '1', 'auto'][index]
  }

  showWidget(layoutNode: any): boolean {
    return this.jsf.evaluateCondition(layoutNode, this.dataIndex)
  }

}

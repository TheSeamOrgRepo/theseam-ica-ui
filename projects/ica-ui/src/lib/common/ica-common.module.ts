import { NgModule } from '@angular/core'

import { IcaSvgDefsComponent } from './components/ica-svg-defs/ica-svg-defs.component'

import { ElemResizedDirective } from './directives/elem-resized.directive'
import { ClickOutsideDirective } from './directives/click-outside.directive'
import { AutofocusDirective } from './directives/autofocus.directive'
import { IcaDropDirective } from './directives/ica-drop.directive'
import { IcaSelectDirective } from './directives/ica-select.directive'

@NgModule({
  imports: [],
  declarations: [
    AutofocusDirective,
    ClickOutsideDirective,
    ElemResizedDirective,
    IcaDropDirective,
    IcaSelectDirective,
    IcaSvgDefsComponent
  ],
  exports: [
    AutofocusDirective,
    ClickOutsideDirective,
    ElemResizedDirective,
    IcaDropDirective,
    IcaSelectDirective,
    IcaSvgDefsComponent
  ]
})
export class IcaCommonModule { }

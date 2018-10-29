import { NgModule } from '@angular/core'

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
    IcaSelectDirective
  ],
  exports: [
    AutofocusDirective,
    ClickOutsideDirective,
    ElemResizedDirective,
    IcaDropDirective,
    IcaSelectDirective
  ]
})
export class IcaCommonModule { }

import { NgModule } from '@angular/core'

import { ElemResizedDirective } from './directives/elem-resized.directive'
import { ClickOutsideDirective } from './directives/click-outside.directive'
import { AutofocusDirective } from './directives/autofocus.directive'

@NgModule({
  imports: [],
  declarations: [
    AutofocusDirective,
    ClickOutsideDirective,
    ElemResizedDirective
  ],
  exports: [
    AutofocusDirective,
    ClickOutsideDirective,
    ElemResizedDirective
  ]
})
export class IcaCommonModule { }

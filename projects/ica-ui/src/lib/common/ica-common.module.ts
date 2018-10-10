import { NgModule } from '@angular/core'

import { ClickOutsideDirective } from './directives/click-outside.directive'
import { AutofocusDirective } from './directives/autofocus.directive'

@NgModule({
  imports: [],
  declarations: [ AutofocusDirective, ClickOutsideDirective ],
  exports: [ AutofocusDirective, ClickOutsideDirective ]
})
export class IcaCommonModule { }

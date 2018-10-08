import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'select-widget-widget'
})
export class SelectWidgetDirective {

  constructor(
    private _viewContainerRef: ViewContainerRef
  ) {
    console.log('select-widget', this._viewContainerRef)
  }

}

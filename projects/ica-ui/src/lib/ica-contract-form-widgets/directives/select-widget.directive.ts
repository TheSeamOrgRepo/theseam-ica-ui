import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core'
import { NgSelectComponent } from '@ng-select/ng-select'

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ng-select'
  // selector: 'select-widget-widget'
})
export class SelectWidgetDirective {

  /**
   * Set the tab index to `-1` to allow the root element of the ng-select
   * component to receive `focus` event from javascript, but not get focused by
   * keyboard navigation.
   */
  @HostBinding('attr.tabIndex') tabIndex = -1

  /**
   * Listening for focus event on root of component to allow javascript
   * `focus()` function to trigger the components focus.
   */
  @HostListener('focus', ['$event']) onFocus($event: FocusEvent) {
    const target = $event.target as HTMLElement
    if (target === this.elementRef.nativeElement) {
      this.ngSelect.focus()
    }
  }

  constructor(
    private elementRef: ElementRef,
    private ngSelect: NgSelectComponent
  ) { }

}

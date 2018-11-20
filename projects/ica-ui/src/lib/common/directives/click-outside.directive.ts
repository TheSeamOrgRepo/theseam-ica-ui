import { Directive, EventEmitter, ElementRef, HostListener, Output } from '@angular/core'

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<MouseEvent>()

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement
    // Check if the click was outside the element
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.clickOutside.emit(event)
    }
  }

  constructor(private elementRef: ElementRef) { }

}

import { Directive, AfterViewInit, ElementRef } from '@angular/core'

@Directive({
  selector: '[icaAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    // console.log('AutofocusDirective', this.el.nativeElement)

    this.el.nativeElement.focus()
  }

}

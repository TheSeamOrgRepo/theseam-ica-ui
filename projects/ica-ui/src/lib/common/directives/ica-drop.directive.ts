import { Directive, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core'

const Drop = (window as any).libs.Drop

@Directive({
  selector: '[icaDrop]'
})
export class IcaDropDirective implements AfterViewInit, OnDestroy {

  private _drop: any

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
      if (this._drop) {
        this._drop.close()
      }
    }
  }

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this._drop = new Drop({
      target: this.el.nativeElement,
      content: this.el.nativeElement.nextElementSibling,
      position: 'bottom right',
      openOn: 'click',
      blurDelay: 0,
      constrainToWindow: true,
      constrainToScrollParent: false
    })
  }

  ngOnDestroy(): void {
    if (this._drop) {
      this._drop.destroy()
    }
  }

}

import { Directive, EventEmitter, ElementRef, Output, OnDestroy, AfterViewInit } from '@angular/core'
import { ResizeSensor } from 'css-element-queries'

// TODO: Find bug that prevents the event triggering for some elements.

export interface IElementResizedEvent {
  element: HTMLElement
  size: { width: number, height: number }
}

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[elemResized]' })
export class ElemResizedDirective implements OnDestroy, AfterViewInit {

  @Output() elemResized = new EventEmitter<IElementResizedEvent>()

  sensor: ResizeSensor

  constructor(private elementRef: ElementRef) { }


  ngAfterViewInit() {
    this.sensor = new ResizeSensor(this.elementRef.nativeElement, (event) => {
      this.elemResized.emit({ element: this.elementRef.nativeElement, size: event })
    })
  }

  ngOnDestroy() {
    this.sensor.detach()
  }

}

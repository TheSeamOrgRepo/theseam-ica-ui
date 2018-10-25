import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

import { ISymbolOverlayItem } from '../../models/ica-contract-builder.models'

@Component({
  selector: 'ica-contract-preview-symbol-overlay',
  templateUrl: './ica-contract-preview-symbol-overlay.component.html',
  styles: [`
    .highlight-rect {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 9px;
      color: transparent;
      max-width: 60px;
    }

    .highlight-rect:hover {
      border: 2px solid cyan;
      border-radius: 2px;
      color: cyan;
      background-color: rgba(30,30,30,0.5);
      max-width: 100%;
      cursor: pointer;
    }
  `]
})
export class IcaContractPreviewSymbolOverlayComponent implements OnInit {

  @Input() item: ISymbolOverlayItem

  @Output() activate = new EventEmitter<ISymbolOverlayItem>()

  constructor() { }

  ngOnInit() {
  }

  onOverlayClick(event: MouseEvent) {
    this.activate.emit(this.item)
  }

}

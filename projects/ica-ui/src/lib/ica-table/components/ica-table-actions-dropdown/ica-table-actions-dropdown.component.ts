import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core'

@Component({
  selector: 'ica-table-actions-dropdown',
  templateUrl: './ica-table-actions-dropdown.component.html',
  styleUrls: ['./ica-table-actions-dropdown.component.scss']
})
export class IcaTableActionsDropdownComponent implements OnInit {

  @Output() action = new EventEmitter<string>()

  public isActive = false

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
        this.isActive = false
    }
  }

  constructor() { }

  ngOnInit() {
  }

  triggerAction(action: string) {
    this.action.emit(action)
  }

}

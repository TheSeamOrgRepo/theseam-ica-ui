import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaModalNewDocumentComponent } from './ica-modal-new-document.component'

describe('IcaModalNewDocumentComponent', () => {
  let component: IcaModalNewDocumentComponent
  let fixture: ComponentFixture<IcaModalNewDocumentComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaModalNewDocumentComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaModalNewDocumentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

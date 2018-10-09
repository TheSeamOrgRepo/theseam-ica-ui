import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaDocumentsComponent } from './ica-documents.component'

describe('IcaDocumentsComponent', () => {
  let component: IcaDocumentsComponent
  let fixture: ComponentFixture<IcaDocumentsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaDocumentsComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaDocumentsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

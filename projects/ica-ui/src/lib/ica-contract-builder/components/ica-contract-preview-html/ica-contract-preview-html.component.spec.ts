import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaContractPreviewHtmlComponent } from './ica-contract-preview-html.component'

describe('IcaContractPreviewHtmlComponent', () => {
  let component: IcaContractPreviewHtmlComponent
  let fixture: ComponentFixture<IcaContractPreviewHtmlComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaContractPreviewHtmlComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaContractPreviewHtmlComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaContractPreviewPdfComponent } from './ica-contract-preview-pdf.component'

describe('IcaContractPreviewPdfComponent', () => {
  let component: IcaContractPreviewPdfComponent
  let fixture: ComponentFixture<IcaContractPreviewPdfComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaContractPreviewPdfComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaContractPreviewPdfComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

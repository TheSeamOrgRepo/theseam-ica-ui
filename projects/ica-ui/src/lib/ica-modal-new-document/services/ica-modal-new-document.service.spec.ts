/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { IcaModalNewDocumentService } from './ica-modal-new-document.service'

describe('Service: IcaModalNewDocument', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IcaModalNewDocumentService]
    })
  })

  it('should ...', inject([IcaModalNewDocumentService], (service: IcaModalNewDocumentService) => {
    expect(service).toBeTruthy()
  }))
})

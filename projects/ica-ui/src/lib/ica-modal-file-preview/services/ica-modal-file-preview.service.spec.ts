/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { IcaModalFilePreviewService } from './ica-modal-file-preview.service'

describe('Service: IcaModalFilePreview', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IcaModalFilePreviewService]
    })
  })

  it('should ...', inject([IcaModalFilePreviewService], (service: IcaModalFilePreviewService) => {
    expect(service).toBeTruthy()
  }))
})

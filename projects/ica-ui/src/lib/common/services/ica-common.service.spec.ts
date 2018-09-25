import { TestBed } from '@angular/core/testing'

import { IcaCommonService } from './ica-common.service'

describe('IcaCommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: IcaCommonService = TestBed.get(IcaCommonService)
    expect(service).toBeTruthy()
  })
})

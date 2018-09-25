import { TestBed } from '@angular/core/testing'

import { IcaLoginService } from './ica-login.service'

describe('IcaLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: IcaLoginService = TestBed.get(IcaLoginService)
    expect(service).toBeTruthy()
  })
})

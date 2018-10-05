import { TestBed } from '@angular/core/testing'

import { IcaNavigationService } from './ica-navigation.service'

describe('IcaNavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: IcaNavigationService = TestBed.get(IcaNavigationService)
    expect(service).toBeTruthy()
  })
})

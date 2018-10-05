import { TestBed } from '@angular/core/testing'

import { IcaContractBuilderService } from './ica-contract-builder.service'

describe('IcaContractBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: IcaContractBuilderService = TestBed.get(IcaContractBuilderService)
    expect(service).toBeTruthy()
  })
})

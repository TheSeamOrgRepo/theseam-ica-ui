/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { LoginAuthExampleService } from './login-auth-example.service'

describe('Service: LoginAuthExample', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginAuthExampleService]
    })
  })

  it('should ...', inject([LoginAuthExampleService], (service: LoginAuthExampleService) => {
    expect(service).toBeTruthy()
  }))
})

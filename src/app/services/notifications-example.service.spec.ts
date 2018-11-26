import { TestBed } from '@angular/core/testing'

import { NotificationsExampleService } from './notifications-example.service'

describe('NotificationsExampleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: NotificationsExampleService = TestBed.get(NotificationsExampleService)
    expect(service).toBeTruthy()
  })
})

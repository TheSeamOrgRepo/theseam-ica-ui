import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaDashboardOverviewTopComponent } from './ica-dashboard-overview-top.component'

describe('IcaDashboardOverviewTopComponent', () => {
  let component: IcaDashboardOverviewTopComponent
  let fixture: ComponentFixture<IcaDashboardOverviewTopComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaDashboardOverviewTopComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaDashboardOverviewTopComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

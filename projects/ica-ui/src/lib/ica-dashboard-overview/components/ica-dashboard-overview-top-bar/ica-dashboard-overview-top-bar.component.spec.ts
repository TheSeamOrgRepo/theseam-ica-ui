import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaDashboardOverviewTopBarComponent } from './ica-dashboard-overview-top-bar.component'

describe('IcaDashboardOverviewTopBarComponent', () => {
  let component: IcaDashboardOverviewTopBarComponent
  let fixture: ComponentFixture<IcaDashboardOverviewTopBarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaDashboardOverviewTopBarComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaDashboardOverviewTopBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

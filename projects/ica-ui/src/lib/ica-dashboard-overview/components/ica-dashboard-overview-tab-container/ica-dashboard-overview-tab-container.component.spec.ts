import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaDashboardOverviewTabContainerComponent } from './ica-dashboard-overview-tab-container.component'

describe('IcaDashboardOverviewTabContainerComponent', () => {
  let component: IcaDashboardOverviewTabContainerComponent
  let fixture: ComponentFixture<IcaDashboardOverviewTabContainerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaDashboardOverviewTabContainerComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaDashboardOverviewTabContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

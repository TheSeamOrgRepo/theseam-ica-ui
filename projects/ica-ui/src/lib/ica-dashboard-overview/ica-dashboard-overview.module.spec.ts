import { IcaDashboardOverviewModule } from './ica-dashboard-overview.module'

describe('IcaDashboardOverviewModule', () => {
  let icaDashboardOverviewModule: IcaDashboardOverviewModule

  beforeEach(() => {
    icaDashboardOverviewModule = new IcaDashboardOverviewModule()
  })

  it('should create an instance', () => {
    expect(icaDashboardOverviewModule).toBeTruthy()
  })
})

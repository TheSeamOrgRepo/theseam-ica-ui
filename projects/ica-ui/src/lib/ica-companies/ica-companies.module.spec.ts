import { IcaCompaniesModule } from './ica-companies.module'

describe('IcaCompaniesModule', () => {
  let icaCompaniesModule: IcaCompaniesModule

  beforeEach(() => {
    icaCompaniesModule = new IcaCompaniesModule()
  })

  it('should create an instance', () => {
    expect(icaCompaniesModule).toBeTruthy()
  })
})

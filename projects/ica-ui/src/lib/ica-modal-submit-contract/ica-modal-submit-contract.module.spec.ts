import { IcaModalSubmitContractModule } from './ica-modal-submit-contract.module'

describe('IcaModalSubmitContractModule', () => {
  let icaModalSubmitContractModule: IcaModalSubmitContractModule

  beforeEach(() => {
    icaModalSubmitContractModule = new IcaModalSubmitContractModule()
  })

  it('should create an instance', () => {
    expect(icaModalSubmitContractModule).toBeTruthy()
  })
})

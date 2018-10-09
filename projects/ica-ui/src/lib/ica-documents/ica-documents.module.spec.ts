import { IcaDocumentsModule } from './ica-documents.module'

describe('IcaDocumentsModule', () => {
  let icaDocumentsModule: IcaDocumentsModule

  beforeEach(() => {
    icaDocumentsModule = new IcaDocumentsModule()
  })

  it('should create an instance', () => {
    expect(icaDocumentsModule).toBeTruthy()
  })
})

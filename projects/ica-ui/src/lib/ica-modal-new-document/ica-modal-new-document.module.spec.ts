import { IcaModalNewDocumentModule } from './ica-modal-new-document.module'

describe('IcaModalNewDocumentModule', () => {
  let icaModalNewDocumentModule: IcaModalNewDocumentModule

  beforeEach(() => {
    icaModalNewDocumentModule = new IcaModalNewDocumentModule()
  })

  it('should create an instance', () => {
    expect(icaModalNewDocumentModule).toBeTruthy()
  })
})

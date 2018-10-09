import { IcaModalFilePreviewModule } from './ica-modal-file-preview.module'

describe('IcaModalFilePreviewModule', () => {
  let icaModalFilePreviewModule: IcaModalFilePreviewModule

  beforeEach(() => {
    icaModalFilePreviewModule = new IcaModalFilePreviewModule()
  })

  it('should create an instance', () => {
    expect(icaModalFilePreviewModule).toBeTruthy()
  })
})

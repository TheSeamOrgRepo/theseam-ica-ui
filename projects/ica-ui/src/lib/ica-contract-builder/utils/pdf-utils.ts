import { Buffer } from 'safe-buffer'
import * as _pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

import { fillDocumentDefinitionData, pdfMakeGetBuffer, pdfMakeGetBase64, pdfMakeGetDataUrl, pdfMakeGetBlob } from './pdfmake-utils'

const pdfMake: any = _pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs

/**
 * Generate PDF Buffer
 */
export const generatePdf = async (
  documentDefinition: object,
  data: object = undefined,
  options?: { pdfResultType?: 'base64' | 'dataUrl' | 'blob' | 'buffer' }
): Promise<string | Blob | Buffer> => {
  const opts = {
    pdfResultType: 'buffer',
    ...(options) ? options : {}
  }

  if (data) {
    fillDocumentDefinitionData(documentDefinition, data)
  }

  const pdfDocGenerator = pdfMake.createPdf(documentDefinition)

  switch (opts.pdfResultType) {
    case 'base64': return pdfMakeGetBase64(pdfDocGenerator)
    case 'dataUrl': return pdfMakeGetDataUrl(pdfDocGenerator)
    case 'blob': return pdfMakeGetBlob(pdfDocGenerator)
    case 'buffer': return pdfMakeGetBuffer(pdfDocGenerator)
  }
}

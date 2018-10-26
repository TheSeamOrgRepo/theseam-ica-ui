import { JsonPointer } from 'angular6-json-schema-form'
import { Buffer } from 'safe-buffer'

// tslint:disable-next-line:max-line-length
const BASE64_TRANSPARENT_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII='

export const pdfMakeGetBase64 = async (pdfMakeRef): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    pdfMakeRef.getBase64((buf) => {
      resolve(buf)
    })
  })
}

export const pdfMakeGetDataUrl = async (pdfMakeRef): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    pdfMakeRef.getDataUrl((buf) => {
      resolve(buf)
    })
  })
}

export const pdfMakeGetBlob = async (pdfMakeRef): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    pdfMakeRef.getBlob((buf) => {
      resolve(buf)
    })
  })
}

export const pdfMakeGetBuffer = async (pdfMakeRef): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    pdfMakeRef.getBuffer((buf) => {
      resolve(buf)
    })
  })
}

export const fillDocumentDefinitionData = (
  documentDefinition: object,
  data: object = undefined
): void => {
  const dataMap = JsonPointer.dict(data)

  const walk = (obj) => {
    for (const key of Object.keys(obj)) {
      const item = obj[key]
      if (typeof(item) === 'object') {
        if (item.hasOwnProperty('link')) {
          const val = `${(dataMap[item.link]) ? dataMap[item.link] : ''}`
          if (item.hasOwnProperty('text')) {
            item.text = (val.length > 0) ? val : ' '
          } else if (item.hasOwnProperty('image')) {
            item.image = (val.length > 0) ? val : BASE64_TRANSPARENT_PNG
          }
        }

        walk(item)
      }
    }
  }

  walk(documentDefinition)
}

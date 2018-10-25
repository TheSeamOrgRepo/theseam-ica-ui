/**
 * Locations of files in the template pack
 */
export interface IContractTemplatePackManifest {
  name: string
  version: string
  schemaUrl: string
  layoutUrl: string
  pdfTplUrl: string
}

/**
 * Contract template pack
 */
export interface IContractTemplatePack {
  formSchema: object
  formLayout: object
  pdfTpl: string
}

/**
 *
 */
export interface ISymbolOverlayItem {
  x: number
  y: number
  w: number
  h: number
  label: string
  pointer: string
  fieldPointer: string
}

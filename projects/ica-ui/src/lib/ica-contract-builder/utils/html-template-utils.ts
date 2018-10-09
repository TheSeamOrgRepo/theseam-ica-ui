/**
 * Parse the JsonPointers from the template
 *
 * @param tpl html template string
 */
export const getTemplateJsonPointers = (tpl: string): string[] => {
  const symbols: string[] = []
  const rxp = /{=([^}]+)}/g
  const str: string = tpl
  let curMatch

  while ((curMatch = rxp.exec(str))) {
    symbols.push(curMatch[1])
  }

  return symbols
}

export const addTemplateHoverActions = (tpl: string, jsonPointers: string[]): string => {
  for (const jsonPointer of jsonPointers) {
    tpl = tpl.replace(`{=${jsonPointer}}`, `<span class="tpl-focusable">{=${jsonPointer}}</span>`)
  }
  return tpl
}

export const setTemplateJsonPointerValue = (tpl: string, jsonPointer: string, value: any): string => {
  return tpl.replace(`>{=${jsonPointer}}`, ` data-pointer="${jsonPointer}">${value}`)
}

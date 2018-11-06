import { IcaTableRowColumnItem } from '../ica-table.models'

export const tableTextFilter = (data: IcaTableRowColumnItem[][], filterText: string): IcaTableRowColumnItem[][] => {
  if (filterText && filterText.trim().length > 0) {
    return data.filter(d => {
      return !!d.find(di => `${di.label}`.toLowerCase().indexOf(filterText) !== -1)
    })
  }
  return data
}

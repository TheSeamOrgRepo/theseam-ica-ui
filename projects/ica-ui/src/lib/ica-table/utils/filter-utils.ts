import { Observable, of, from } from 'rxjs'
import { switchMap, filter, tap, toArray } from 'rxjs/operators'

import { IcaTableRowColumnItem, IcaTableColumn } from '../ica-table.models'

export const tableTextFilter = (data: IcaTableRowColumnItem[][], filterText: string): IcaTableRowColumnItem[][] => {
  if (filterText && filterText.trim().length > 0) {
    return data.filter(d => {
      return !!d.find(di => `${di.label}`.toLowerCase().indexOf(filterText) !== -1)
    })
  }
  return data
}

export const icaTableTextFilter = (filterText: string, columns: IcaTableColumn[]) => (source: Observable<any[]>) =>
  source.pipe(
    tap(_ => console.log('filterText', filterText)),
    tap(rows => console.log('rows', rows, filterText, !(filterText && filterText.trim().length > 0))),
    switchMap(rows => !(filterText && filterText.trim().length > 0)
      ? of(rows)
      : from(rows).pipe(
          tap(row => console.log('row', row)),
          filter(row => {
            for (const col of columns) {
              console.log(`${row[col.prop]}`.toLowerCase(), filterText, `${row[col.prop]}`.toLowerCase().indexOf(filterText) !== -1)
              if (`${row[col.prop]}`.toLowerCase().indexOf(filterText) !== -1) {
                return true
              }
            }
            return false
          }),
          toArray()
        )
    )
  )

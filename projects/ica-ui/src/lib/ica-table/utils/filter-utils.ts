import { Observable, of, from, combineLatest } from 'rxjs'
import { switchMap, filter, toArray, map } from 'rxjs/operators'

export const icaTableFilterRowsByColumns = (rows: any[], columns: string[], filterText: string) =>
  from(rows).pipe(
    filter(row => {
      for (const col of columns) {
        if (`${row[col]}`.toLowerCase().indexOf(filterText) !== -1) { return true }
      }
      return false
    }),
    toArray()
  )

export const icaTableTextFilter = (filterText$: Observable<string>, columns$: Observable<string[]>) =>
  (source: Observable<any[]>) => {
  const _filterText$ = filterText$.pipe(map(v => (v && v.length > 0) ? v : undefined))
  const _columns$ = columns$.pipe(map(v => (v && v.length > 0) ? v : undefined))

  return source.pipe(
    switchMap(rows => combineLatest(_filterText$, _columns$).pipe(
      switchMap(([filterText, columns]) => (!filterText || !columns)
        ? of(rows)
        : icaTableFilterRowsByColumns(rows, columns, filterText))
    ))
  )
}

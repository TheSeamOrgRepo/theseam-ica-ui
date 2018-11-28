export interface IcaTableHeaderColumnItem {
  name: string
  label: string
}

export interface IcaTableRowColumnItem {
  name: string
  label: string
  cssClass?: string
}

export interface IcaTableColumn {
  name: string
  prop: string
}

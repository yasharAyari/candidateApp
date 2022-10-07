export type Status = 'approved' | 'rejected' | 'waiting'

export type SortOrder = "asc" | "desc"

export interface Data {
  id: number
  name: string
  email: string
  birth_date: string
  year_of_experience: number
  position_applied: string
  application_date: string
  status: Status
}

export type SortKeys = string

export interface Columns {
  key: SortKeys
  label: string
  sort?: boolean
  search?: boolean
  format?: Function
}

export interface Rows {
  [name: string]: any
}

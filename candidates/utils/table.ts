import { isEmpty, toLower, isString, isNumber } from 'lodash'
import { Rows } from '../interfaces'

function _sorMethod(sortKey: string) {
  switch(sortKey) {
    case 'year_of_experience':
      return (a: Rows, b: Rows) => a['year_of_experience'] - b['year_of_experience']
    case 'application_date':
      return (a: Rows, b: Rows) => Date.parse(a['application_date']) - Date.parse(b['application_date'])
    case 'position_applied':
      return (a: Rows, b: Rows) => a['position_applied'].localeCompare(b['position_applied'])
  } 
}

export function sortRows(data: Rows[], sortKey: string, reverse?: boolean) {
  if(!sortKey) return data

  const sortedData = data.sort(_sorMethod(sortKey) as any)
  if(reverse) return sortedData.reverse()

  return sortedData
}

export function filterRows(rows: Rows[], filters: Rows) {
  if (isEmpty(filters)) return rows
  return rows.filter((row) => {
    return Object.keys(filters).every((key: string) => {
      const value = row[key]
      const searchValue = filters[key]

      if (isString(value)) {
        return toLower(value).includes(toLower(searchValue))
      }

      if(isNumber(value)) {
        return value == searchValue
      }

      return false
    })
  })
}

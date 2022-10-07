import { useRouter } from 'next/router'
import { useMemo } from 'react'
import SortIcon from '../sortIcon'
import { Columns, Rows, SortKeys, SortOrder } from '../../interfaces'
import { filterRows, sortRows } from '../../utils/table'
import Styles from './table.module.css'


interface TableProps {
  columns: Columns[]
  rows: Rows[]
}

const Table = ({ columns, rows }: TableProps) => {
  const router = useRouter()
  const { query } = router

  const filteredRows = useMemo(() => {
    const searchFields = columns.filter((item) => item.search)
      .reduce((acc, item) => ({ ...acc, [item.key]: query[item.key] }), {})
    return filterRows(rows, searchFields)
  }, [columns, query, rows])

  const sortedData = useMemo(
    () => sortRows(filteredRows, query.sortKey as SortKeys, query.sortOrder === "desc"),
    [query.sortKey, query.sortOrder, filteredRows]
  )

  const handleSearch = (value: string, key: string) => {
    router.query[key] = value
    router.push(router, undefined, { shallow: true })
  }

  function changeSort(key: SortKeys) {
    const order = router.query.sortOrder === "asc" ? "desc" : "asc"
    router.query.sortOrder = order
    router.query.sortKey = key
    router.push(router, undefined, { shallow: true })
  }
  
  return (
    <table className={Styles.table}>
      <thead>
        <tr>
        {columns.map((row) => (
          <th
            key={row.key}
            onClick={() => row.sort && changeSort(row.key)}
            className={row.sort ? Styles.sortable : ''}
          >
            {row.label}{" "}
            {row.sort && <SortIcon
              columnKey={row.key}
              sortOrder={query.sortOrder as SortOrder}
              sortKey={query.sortKey as SortKeys}
            />}
          </th>
        ))}
        </tr>
        <tr>
          {
            columns.map((column) => (
              <th key={column.key}>
              {column.search && <input
                key={`${column.key}-search`}
                type="search"
                placeholder={`Search ${column.label}`}
                className={Styles.search}
                value={router.query[column.key] || ''}
                data-testid={`search-${column.key}}`}
                onChange={(event) => handleSearch(event.target.value, column.key)}
              />}
              </th>
              )
            )
          }
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (<tr key={row.id}>
          {columns.map((column) => {
            if (column.format) {
              return <td key={column.key}>{column.format(row[column.key])}</td>
            }
            return <td key={column.key}>{row[column.key]}</td>
          })}
        </tr>)
        )}
      </tbody>
    </table>
  )
}

export default Table

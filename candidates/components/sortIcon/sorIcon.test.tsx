import { render } from '@testing-library/react'
import SortIcon from "."

describe('sortIcon', () => {
  it('should return arrowUPDown icon when sortKey and columnKey are not equal', () => {
    const { getByTestId } = render(<SortIcon sortKey="sortKey" columnKey="columnKey" sortOrder="asc" /> )
    const icon = getByTestId('arrowUpDown')
    expect(icon).toBeTruthy()
  })
  it('should return arrowUp icon when sortKey and columnKey are equal', () => {
    const { getByTestId } = render(<SortIcon sortKey="sortKey" columnKey="sortKey" sortOrder="asc" /> )
    const icon = getByTestId('arrowUp')
    expect(icon).toBeTruthy()
  })
})

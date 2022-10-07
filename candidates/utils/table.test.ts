import { sortRows, filterRows } from "./table"

const mockData = [
  {
    id: 2,
    name: 'Colette Morar',
    email: 'corinnestark@pacocha.co',
    birth_date: '1998-08-03',
    year_of_experience: 3,
    position_applied: 'Designer',
    application_date: '2017-11-18',
    status: 'waiting',
  },
  {
    id: 3,
    name: 'Rosalind Rath DDS',
    email: 'sandyankunding@marks.io',
    birth_date: '1980-03-28',
    year_of_experience: 15,
    position_applied: 'Orchestrator',
    application_date: '2018-01-31',
    status: 'approved',
  },
  {
    id: 4,
    name: 'Cyrstal Kunze',
    email: 'lavernokon@stroman.name',
    birth_date: '1997-10-30',
    year_of_experience: 8,
    position_applied: 'Analyst',
    application_date: '2018-09-12',
    status: 'rejected',
  },
  {
    id: 1,
    name: 'Alvin Satterfield',
    email: 'cornellbartell@connellyleannon.biz',
    birth_date: '1997-09-07',
    year_of_experience: 5,
    position_applied: 'Technician',
    application_date: '2018-07-02',
    status: 'rejected',
  },
]

describe('sortRows method', () => {
  it('should sort the list based on provided key', () => {
    const expectValue = mockData[2].position_applied
    expect(sortRows([ ...mockData ], 'position_applied')[0].position_applied).toEqual(expectValue)
  })
  it('should sort the list based on provided key in descending order ', () => {
    const expectValue = mockData[3].position_applied
    expect(sortRows([ ...mockData ], 'position_applied', true)[0].position_applied).toEqual(expectValue)
  })
})

describe('filterRows method', () => {
  it('should filter the list when filter object is empty', () => {
    expect(filterRows([ ...mockData ], {})).toHaveLength(4)
  })
  it('should filter the list with provided filter object', () => {
    expect(filterRows([ ...mockData ], { status: 'rejected', name: 'Alvin' })).toHaveLength(1)
  })
  it('should return an empty array when filter result is empty', () => {
    expect(filterRows([ ...mockData ], { status: 'rejected', name: 'approved' })).toHaveLength(0)
  })
})

import getAge from "./getAge"


describe('getAge method', () => {
  beforeAll(() => {
    // Tell Jest to use a different timer implementation
    jest.useFakeTimers()
    jest.setSystemTime(new Date('04 Oct 2020 00:12:00 GMT').getTime());
  })
  afterAll(() => {
    // Back to reality...
    jest.useRealTimers();
  })

  it('should return 25 when date is equal to "1997-07-02"', () => {
    expect(getAge('1997-07-02')).toEqual(23)
  })

  it('should return 45 when date is equal to "1973-11-02"', () => {
    expect(getAge('1973-11-02')).toEqual(46)
  })
})

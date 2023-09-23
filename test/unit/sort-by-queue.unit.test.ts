import sortByQueue from '../../src/sort-by-queue'

describe('sort-by-queue', () => {
  it('returns empty array if given empty array', () => {
    expect(sortByQueue([])).toEqual([])
  })
  it('returns single element', () => {
    expect(sortByQueue([1])).toEqual([1])
  })
  it('returns double element list if already sorted', () => {
    expect(sortByQueue([1, 2])).toEqual([1, 2])
  })
  it('returns sorted double element list if not sorted', () => {
    expect(sortByQueue([2, 1])).toEqual([1, 2])
  })
  it('returns triple element list if already sorted', () => {
    expect(sortByQueue([1, 2, 3])).toEqual([1, 2, 3])
  })
  it('returns sorted triple element list if not sorted', () => {
    expect(sortByQueue([3, 2, 1])).toEqual([1, 2, 3])
  })
  it('returns sorted triple element list if mixed sorted front', () => {
    expect(sortByQueue([2, 3, 1])).toEqual([1, 2, 3])
  })
  it('returns sorted triple element list if mixed sorted front', () => {
    expect(sortByQueue([1, 3, 2])).toEqual([1, 2, 3])
  })
  it('returns sorted triple element list if mixed sorted middle', () => {
    expect(sortByQueue([3, 1, 2])).toEqual([1, 2, 3])
  })
})

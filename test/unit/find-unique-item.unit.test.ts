import findUniqueItem from '../../src/find-unique-item'

describe('find-unique-item', () => {
  it('returns undefined if both arrays empty', () => {
    expect(findUniqueItem([], [])).toEqual(undefined)
  })
  it('returns item in single first array if second empty', () => {
    expect(findUniqueItem([1], [])).toEqual(1)
  })
  it('returns item in single second array if second empty', () => {
    expect(findUniqueItem([], [1])).toEqual(1)
  })
  it('returns item in single first array if single second different', () => {
    expect(findUniqueItem([1], [2])).toEqual(1)
  })
  it('returns undefined if single arrays have same item', () => {
    expect(findUniqueItem([1], [1])).toEqual(undefined)
  })
  it('returns item in double first array if second empty', () => {
    expect(findUniqueItem([1, 2], [])).toEqual(1)
  })
  it('returns item in double second array if second empty', () => {
    expect(findUniqueItem([], [1, 2])).toEqual(1)
  })
  it('returns item in double first array if double second different first', () => {
    expect(findUniqueItem([1, 2], [2, 3])).toEqual(1)
  })
  it('returns item in double first array if double second different second', () => {
    expect(findUniqueItem([1, 2], [1, 3])).toEqual(2)
  })
  it('returns undefined if double arrays have same item', () => {
    expect(findUniqueItem([1, 2], [1, 2])).toEqual(undefined)
  })
})

import findDuplicate from '../../src/find-duplicate'

describe('findDuplicate', () => {
  it('returns undefined if empty list', () => {
    expect(findDuplicate([])).toEqual(undefined)
  })
  it('returns first item in single list', () => {
    expect(findDuplicate([1])).toEqual(1)
  })
  it('returns first item if double list without duplicate', () => {
    expect(findDuplicate([1, 2])).toEqual(1)
  })
  it('returns undefined if double list with duplicates', () => {
    expect(findDuplicate([1, 1])).toEqual(undefined)
  })
  it('returns first item if triple list with last two duplicate', () => {
    expect(findDuplicate([1, 2, 2])).toEqual(1)
  })
  it('returns third item if triple list with first two duplicate', () => {
    expect(findDuplicate([1, 1, 2])).toEqual(2)
  })
  it('returns first item if quadruple list with last three duplicate', () => {
    expect(findDuplicate([1, 2, 2, 2])).toEqual(1)
  })
  it('returns third item if quadruple list with first two duplicate', () => {
    expect(findDuplicate([1, 1, 2, 3])).toEqual(2)
  })
  it('returns undefined if quadruple list with all duplicate', () => {
    expect(findDuplicate([1, 1, 2, 2])).toEqual(undefined)
  })
})

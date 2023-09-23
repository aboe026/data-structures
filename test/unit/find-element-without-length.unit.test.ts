import findElementWithoutLength from '../../src/find-element-without-length'

describe('find-element-without-length', () => {
  it('returns undefined if given empty list', () => {
    expect(findElementWithoutLength([], 1)).toEqual(undefined)
  })
  it('returns undefined if target does not exist in single list', () => {
    expect(findElementWithoutLength([1], 2)).toEqual(undefined)
  })
  it('returns 0 if target exists in single list', () => {
    expect(findElementWithoutLength([1], 1)).toEqual(0)
  })
  it('returns undefined if target does not exist in double list', () => {
    expect(findElementWithoutLength([1, 2], 3)).toEqual(undefined)
  })
  it('returns 0 if target exists first in double list', () => {
    expect(findElementWithoutLength([1, 2], 1)).toEqual(0)
  })
  it('returns 1 if target exists second in double list', () => {
    expect(findElementWithoutLength([1, 2], 2)).toEqual(1)
  })
})

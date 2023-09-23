import { binarySearchIterative, binarySearchRecursive } from '../../src/binary-search'

describe('binarySearch', () => {
  describe('binarySearchRecursive', () => {
    it('returns undefined if empty array', () => {
      expect(binarySearchIterative([], 1)).toEqual(undefined)
    })
    it('returns undefined if does not exist in single array', () => {
      expect(binarySearchIterative([1], 2)).toEqual(undefined)
    })
    it('returns 0 if exists in single array', () => {
      expect(binarySearchIterative([1], 1)).toEqual(0)
    })
    it('returns undefined if does not exist in double array', () => {
      expect(binarySearchIterative([1, 2], 3)).toEqual(undefined)
    })
    it('returns 0 if exists first in double array', () => {
      expect(binarySearchIterative([1, 2], 1)).toEqual(0)
    })
    it('returns 1 if exists second in double array', () => {
      expect(binarySearchIterative([1, 2], 2)).toEqual(1)
    })
    it('returns undefined if does not exist in triple array', () => {
      expect(binarySearchIterative([1, 2, 3], 4)).toEqual(undefined)
    })
    it('returns 0 if exists first in triple array', () => {
      expect(binarySearchIterative([1, 2, 3], 1)).toEqual(0)
    })
    it('returns 1 if exists second in triple array', () => {
      expect(binarySearchIterative([1, 2, 3], 2)).toEqual(1)
    })
    it('returns 2 if exists third in triple array', () => {
      expect(binarySearchIterative([1, 2, 3], 3)).toEqual(2)
    })
  })
  describe('binarySearchRecursive', () => {
    it('returns undefined if empty array', () => {
      expect(binarySearchRecursive([], 1)).toEqual(undefined)
    })
    it('returns undefined if does not exist in single array', () => {
      expect(binarySearchRecursive([1], 2)).toEqual(undefined)
    })
    it('returns 0 if exists in single array', () => {
      expect(binarySearchRecursive([1], 1)).toEqual(0)
    })
    it('returns undefined if does not exist in double array', () => {
      expect(binarySearchRecursive([1, 2], 3)).toEqual(undefined)
    })
    it('returns 0 if exists first in double array', () => {
      expect(binarySearchRecursive([1, 2], 1)).toEqual(0)
    })
    it('returns 1 if exists second in double array', () => {
      expect(binarySearchRecursive([1, 2], 2)).toEqual(1)
    })
    it('returns undefined if does not exist in triple array', () => {
      expect(binarySearchRecursive([1, 2, 3], 4)).toEqual(undefined)
    })
    it('returns 0 if exists first in triple array', () => {
      expect(binarySearchRecursive([1, 2, 3], 1)).toEqual(0)
    })
    it('returns 1 if exists second in triple array', () => {
      expect(binarySearchRecursive([1, 2, 3], 2)).toEqual(1)
    })
    it('returns 2 if exists third in triple array', () => {
      expect(binarySearchRecursive([1, 2, 3], 3)).toEqual(2)
    })
  })
})

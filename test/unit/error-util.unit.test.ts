import { replaceInErrorMessage } from '../../src/error-util'

describe('Error Util Unit Tests', () => {
  describe('replaceInErrorMessage', () => {
    it('does not modify error message if no matches', () => {
      expect(() =>
        replaceInErrorMessage({
          operation: () => {
            throw Error('one')
          },
          from: 'two',
          to: 'three',
        })
      ).toThrow('one')
    })
    it('modifies error message if match found', () => {
      expect(() =>
        replaceInErrorMessage({
          operation: () => {
            throw Error('one')
          },
          from: 'one',
          to: 'two',
        })
      ).toThrow('two')
    })
    it('sets global and ignoreCase RegExp flags by default', () => {
      expect(() =>
        replaceInErrorMessage({
          operation: () => {
            throw Error('one Two three')
          },
          from: 't',
          to: 'tee',
        })
      ).toThrow('one teewo teehree')
    })
    it('can disable default global and ignoreCase RegExp flags', () => {
      expect(() =>
        replaceInErrorMessage({
          operation: () => {
            throw Error('one Two three')
          },
          from: 't',
          to: 'tee',
          flags: [],
        })
      ).toThrow('one Two teehree')
    })
    it('returns operation data if no error thrown', () => {
      expect(
        replaceInErrorMessage({
          operation: () => 'data',
          from: 'one',
          to: 'two',
        })
      ).toEqual('data')
    })
  })
})

import Stack from '../../src/stack'
import { verifyStack } from './helpers'

describe('Stack Unit Tests', () => {
  describe('constructor', () => {
    it('can create without parameters', () => {
      verifyStack(new Stack(), [])
    })
    it('can create with one parameter', () => {
      verifyStack(new Stack(1), [1])
    })
    it('can create with two parameters', () => {
      verifyStack(new Stack(1, 2), [2, 1])
    })
    it('can create with three parameters', () => {
      verifyStack(new Stack(1, 2, 3), [3, 2, 1])
    })
  })
  describe('serialize', () => {
    it('returns empty string for empty', () => {
      expect(new Stack().serialize()).toEqual('')
    })
    it('returns data for single', () => {
      expect(new Stack(1).serialize()).toEqual('1')
    })
    it('returns datas separated by arrow for double', () => {
      expect(new Stack(1, 2).serialize()).toEqual('2 -> 1')
    })
    it('returns datas separated by arrow for triple', () => {
      expect(new Stack(1, 2, 3).serialize()).toEqual('3 -> 2 -> 1')
    })
  })
  describe('push', () => {
    it('can add when empty', () => {
      const stack = new Stack()
      verifyStack(stack.push(1), [1])
      verifyStack(stack, [1])
    })
    it('can add to single', () => {
      const stack = new Stack(1)
      verifyStack(stack, [1])
      verifyStack(stack.push(2), [2, 1])
      verifyStack(stack, [2, 1])
    })
    it('can add to double', () => {
      const stack = new Stack(1, 2)
      verifyStack(stack, [2, 1])
      verifyStack(stack.push(3), [3, 2, 1])
      verifyStack(stack, [3, 2, 1])
    })
    it('cannot add undefined', () => {
      const stack = new Stack(1)
      verifyStack(stack, [1])
      verifyStack(stack.push(undefined), [1])
      verifyStack(stack, [1])
    })
  })
  describe('pop', () => {
    it('returns undefined when empty', () => {
      const stack = new Stack()
      verifyStack(stack, [])
      expect(stack.pop()).toEqual(undefined)
      verifyStack(stack, [])
    })
    it('returns only item and empties single item stack', () => {
      const stack = new Stack(1)
      verifyStack(stack, [1])
      expect(stack.pop()).toEqual(1)
      verifyStack(stack, [])
    })
    it('returns top of stack and leaves only one item in double item stack', () => {
      const stack = new Stack(1, 2)
      verifyStack(stack, [2, 1])
      expect(stack.pop()).toEqual(2)
      verifyStack(stack, [1])
    })
    it('item can be added to stack after all items popped', () => {
      const stack = new Stack(1)
      verifyStack(stack, [1])
      expect(stack.pop()).toEqual(1)
      verifyStack(stack, [])
      verifyStack(stack.push(2), [2])
      verifyStack(stack, [2])
    })
  })
  describe('peek', () => {
    it('returns undefined when', () => {
      const stack = new Stack()
      verifyStack(stack, [])
      expect(stack.peek()).toEqual(undefined)
      verifyStack(stack, [])
    })
    it('returns only item from single', () => {
      const stack = new Stack(1)
      verifyStack(stack, [1])
      expect(stack.peek()).toEqual(1)
      verifyStack(stack, [1])
    })
    it('returns top item from double', () => {
      const stack = new Stack(1, 2)
      verifyStack(stack, [2, 1])
      expect(stack.peek()).toEqual(2)
      verifyStack(stack, [2, 1])
    })
    it('returns top item from triple', () => {
      const stack = new Stack(1, 2, 3)
      verifyStack(stack, [3, 2, 1])
      expect(stack.peek()).toEqual(3)
      verifyStack(stack, [3, 2, 1])
    })
    it('returns undefined after all items removed', () => {
      const stack = new Stack(1)
      verifyStack(stack, [1])
      expect(stack.peek()).toEqual(1)
      verifyStack(stack, [1])
      expect(stack.pop()).toEqual(1)
      verifyStack(stack, [])
      expect(stack.peek()).toEqual(undefined)
      verifyStack(stack, [])
    })
  })
})

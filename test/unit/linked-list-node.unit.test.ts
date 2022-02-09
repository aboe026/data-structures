import LinkedListNode, { isLinkedListNode } from '../../src/linked-list-node'

describe('Linked List Node Unit Tests', () => {
  describe('data', () => {
    it('can get data from node', () => {
      expect(new LinkedListNode(1).data).toEqual(1)
    })
  })
  describe('next', () => {
    it('can set next from undefined to node', () => {
      const node = new LinkedListNode(2)
      const nextNode = new LinkedListNode(3)
      expect(node.data).toEqual(2)
      expect(node.next).toEqual(undefined)
      expect(nextNode.data).toEqual(3)
      expect(nextNode.next).toEqual(undefined)
      node.next = nextNode
      expect(node.data).toEqual(2)
      expect(node.next).not.toEqual(undefined)
      expect(node.next.data).toEqual(3)
      expect(node.next.next).toEqual(undefined)
      expect(nextNode.data).toEqual(3)
      expect(nextNode.next).toEqual(undefined)
    })
    it('can set next from node to undefined', () => {
      const node = new LinkedListNode(6)
      const nextNode = new LinkedListNode(7)
      node.next = nextNode
      expect(node.data).toEqual(6)
      expect(node.next).not.toEqual(undefined)
      expect(node.next.data).toEqual(7)
      expect(node.next.next).toEqual(undefined)
      expect(nextNode.data).toEqual(7)
      expect(nextNode.next).toEqual(undefined)
      node.next = undefined
      expect(node.data).toEqual(6)
      expect(node.next).toEqual(undefined)
      expect(nextNode.data).toEqual(7)
      expect(nextNode.next).toEqual(undefined)
    })
    it('can set next from node to node', () => {
      const node = new LinkedListNode(8)
      const nextNode = new LinkedListNode(9)
      const newNextNode = new LinkedListNode(10)
      node.next = nextNode
      expect(node.data).toEqual(8)
      expect(node.next).not.toEqual(undefined)
      expect(node.next.data).toEqual(9)
      expect(node.next.next).toEqual(undefined)
      expect(nextNode.data).toEqual(9)
      expect(nextNode.next).toEqual(undefined)
      expect(newNextNode.data).toEqual(10)
      expect(newNextNode.next).toEqual(undefined)
      node.next = newNextNode
      expect(node.data).toEqual(8)
      expect(node.next).not.toEqual(undefined)
      expect(node.next.data).toEqual(10)
      expect(node.next.next).toEqual(undefined)
      expect(nextNode.data).toEqual(9)
      expect(nextNode.next).toEqual(undefined)
      expect(newNextNode.data).toEqual(10)
      expect(newNextNode.next).toEqual(undefined)
    })
  })
  describe('serialize', () => {
    it('returns data for node with just data', () => {
      expect(new LinkedListNode(1).serialize()).toEqual('1')
    })
    it('returns data for node with data and undefined next', () => {
      expect(new LinkedListNode(1, undefined).serialize()).toEqual('1')
    })
    it('returns datas separated by arrows for node with next', () => {
      expect(new LinkedListNode(1, new LinkedListNode(2)).serialize()).toEqual('1 -> 2')
    })
    it('returns datas separated by arrows for node with two nexts', () => {
      expect(new LinkedListNode(1, new LinkedListNode(2, new LinkedListNode(3))).serialize()).toEqual('1 -> 2 -> 3')
    })
  })
  describe('isLinkedListNode', () => {
    it('returns true for node', () => {
      expect(isLinkedListNode(new LinkedListNode(11))).toEqual(true)
    })
    it('returns false for undefined', () => {
      expect(isLinkedListNode(undefined)).toEqual(false)
    })
    it('returns false for null', () => {
      expect(isLinkedListNode(null)).toEqual(false)
    })
    it('returns false for false', () => {
      expect(isLinkedListNode(false)).toEqual(false)
    })
    it('returns false for true', () => {
      expect(isLinkedListNode(true)).toEqual(false)
    })
    it('returns false for empty string', () => {
      expect(isLinkedListNode('')).toEqual(false)
    })
    it('returns false for single character string', () => {
      expect(isLinkedListNode('a')).toEqual(false)
    })
    it('returns false for multiple character string', () => {
      expect(isLinkedListNode('abc')).toEqual(false)
    })
    it('returns false for negative number', () => {
      expect(isLinkedListNode(-1)).toEqual(false)
    })
    it('returns false for zero', () => {
      expect(isLinkedListNode(0)).toEqual(false)
    })
    it('returns false for positive number', () => {
      expect(isLinkedListNode(1)).toEqual(false)
    })
    it('returns false for empty array', () => {
      expect(isLinkedListNode([])).toEqual(false)
    })
    it('returns false for single element array', () => {
      expect(isLinkedListNode(['a'])).toEqual(false)
    })
    it('returns false for multiple element array', () => {
      expect(isLinkedListNode(['a', 'b'])).toEqual(false)
    })
    it('returns false for object with just _data', () => {
      expect(
        isLinkedListNode({
          _data: 1,
        })
      ).toEqual(false)
    })
    it('returns false for object with just next', () => {
      expect(
        isLinkedListNode({
          next: undefined,
        })
      ).toEqual(false)
    })
    it('returns false for object with _data next and another property', () => {
      expect(
        isLinkedListNode({
          _data: 1,
          next: undefined,
          foo: 'bar',
        })
      ).toEqual(false)
    })
  })
})

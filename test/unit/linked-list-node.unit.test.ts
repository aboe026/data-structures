import LinkedListNode, { isLinkedListNode } from '../../src/linked-list-node'
import { verifyListNode } from './helpers'

describe('Linked List Node Unit Tests', () => {
  describe('constructor', () => {
    it('throws error for empty string', () => {
      expect(() => new LinkedListNode('')).toThrow('Data for LinkedListNode cannot be empty string.')
    })
    it('can create from string', () => {
      verifyListNode(new LinkedListNode('a'), 'a')
    })
    it('can create from number', () => {
      verifyListNode(new LinkedListNode(1), 1)
    })
  })
  describe('data', () => {
    it('can get string data from node', () => {
      expect(new LinkedListNode('1').data).toEqual('1')
    })
    it('can get number data from node', () => {
      expect(new LinkedListNode(1).data).toEqual(1)
    })
  })
  describe('next', () => {
    it('can set next from undefined to node', () => {
      const node = new LinkedListNode(1)
      const nextNode = new LinkedListNode(2)
      verifyListNode(node, 1)
      verifyListNode(nextNode, 2)
      node.next = nextNode
      verifyListNode(node, 1, 2)
      verifyListNode(nextNode, 2)
    })
    it('can set next from node to undefined', () => {
      const node = new LinkedListNode(1)
      const nextNode = new LinkedListNode(2)
      verifyListNode(node, 1)
      verifyListNode(nextNode, 2)
      node.next = nextNode
      verifyListNode(node, 1, 2)
      verifyListNode(nextNode, 2)
      node.next = undefined
      verifyListNode(node, 1)
      verifyListNode(nextNode, 2)
    })
    it('can set next from node to node', () => {
      const node = new LinkedListNode(1)
      const nextNode = new LinkedListNode(2)
      const newNextNode = new LinkedListNode(3)
      verifyListNode(node, 1)
      verifyListNode(nextNode, 2)
      verifyListNode(newNextNode, 3)
      node.next = nextNode
      verifyListNode(node, 1, 2)
      verifyListNode(nextNode, 2)
      verifyListNode(newNextNode, 3)
      node.next = newNextNode
      verifyListNode(node, 1, 3)
      verifyListNode(nextNode, 2)
      verifyListNode(newNextNode, 3)
    })
  })
  describe('serialize', () => {
    it('returns data for node with just data', () => {
      expect(new LinkedListNode(1).serialize()).toEqual('|1|')
    })
    it('returns data for node with data and explicitly undefined next', () => {
      expect(new LinkedListNode(1, undefined).serialize()).toEqual('|1|')
    })
    it('returns datas separated by arrows for node with next', () => {
      expect(new LinkedListNode(1, new LinkedListNode(2)).serialize()).toEqual('|1->2|')
    })
    it('returns datas separated by arrows for node with two nexts', () => {
      expect(new LinkedListNode(1, new LinkedListNode(2, new LinkedListNode(3))).serialize()).toEqual('|1->2->3|')
    })
  })
  describe('deserialize', () => {
    it('throws error for empty string', () => {
      expect(() => LinkedListNode.deserialize('')).toThrow(
        'Invalid LinkedListNode serialization string "": Must begin with character "|".'
      )
    })
    it('throws error if beginning character omitted', () => {
      expect(() => LinkedListNode.deserialize('a|')).toThrow(
        'Invalid LinkedListNode serialization string "a|": Must begin with character "|".'
      )
    })
    it('throws error if end character omitted', () => {
      expect(() => LinkedListNode.deserialize('|a')).toThrow(
        'Invalid LinkedListNode serialization string "|a": Must end with character "|".'
      )
    })
    it('throws error if data is empty string', () => {
      expect(() => LinkedListNode.deserialize('||')).toThrow('Data for LinkedListNode cannot be empty string.')
    })
    it('converts single string to single node implicitly', () => {
      verifyListNode(LinkedListNode.deserialize('|a|'), 'a')
    })
    it('converts single string to single node explicitly', () => {
      verifyListNode(LinkedListNode.deserialize('|a|', String), 'a')
    })
    it('converts single number to single node', () => {
      verifyListNode(LinkedListNode.deserialize('|1|', Number), 1)
    })
    it('converts multiple numbers to multiple node', () => {
      verifyListNode(LinkedListNode.deserialize('|1->2->3|', Number), 1, 2, 3)
    })
    it('converts multiple strings to multiple node', () => {
      verifyListNode(LinkedListNode.deserialize('|a->b->c|'), 'a', 'b', 'c')
    })
  })
  describe('isLinkedListNode', () => {
    it('returns true for node without next', () => {
      expect(isLinkedListNode(new LinkedListNode(1))).toEqual(true)
    })
    it('returns true for node with next', () => {
      expect(isLinkedListNode(new LinkedListNode(1, new LinkedListNode(2)))).toEqual(true)
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
    it('returns false for object with just next', () => {
      expect(
        isLinkedListNode({
          next: undefined,
        })
      ).toEqual(false)
    })
    it('returns false for object with just serialize', () => {
      expect(
        isLinkedListNode({
          serialize: () => '',
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

import LinkedList from '../../src/linked-list'
import LinkedListNode from '../../src/linked-list-node'

import { verifyList, verifyListNode } from './helpers'

describe('Linked List Unit Tests', () => {
  describe('constructor', () => {
    it('can create without parameters', () => {
      verifyList(new LinkedList(), [])
    })
    it('can create from number', () => {
      const list = new LinkedList(1)
      verifyList(list, [1])
    })
    it('can create from string', () => {
      const list = new LinkedList('1')
      verifyList(list, ['1'])
    })
    it('can create from node without a next', () => {
      const node = new LinkedListNode(1)
      verifyListNode(node, 1)
      const list = new LinkedList(node)
      verifyList(list, [1])
      verifyListNode(node, 1)
    })
    it('can create from node with a next', () => {
      const nextNode = new LinkedListNode(2)
      const node = new LinkedListNode(1, nextNode)
      verifyListNode(node, 1, 2)
      verifyListNode(nextNode, 2)
      const list = new LinkedList(node)
      verifyList(list, [1, 2])
      verifyListNode(node, 1, 2)
      verifyListNode(nextNode, 2)
    })
    it('can create from multiple numbers', () => {
      const list = new LinkedList(1, 2)
      verifyList(list, [1, 2])
    })
    it('can create from multiple nodes', () => {
      const node = new LinkedListNode(1)
      const otherNode = new LinkedListNode(2)
      verifyListNode(node, 1)
      verifyListNode(otherNode, 2)
      const list = new LinkedList(node, otherNode)
      verifyList(list, [1, 2])
      verifyListNode(node, 1)
      verifyListNode(otherNode, 2)
    })
    it('can create from multiple mixed', () => {
      const node = new LinkedListNode(1)
      const otherNode = new LinkedListNode(3)
      verifyListNode(node, 1)
      verifyListNode(otherNode, 3)
      const list = new LinkedList(node, 2, otherNode)
      verifyList(list, [1, 2, 3])
      verifyListNode(node, 1)
      verifyListNode(otherNode, 3)
    })
    it('preserves next of first node added with successive node', () => {
      const nextNode = new LinkedListNode(2)
      const node = new LinkedListNode(1, nextNode)
      const otherNode = new LinkedListNode(3)
      verifyListNode(node, 1, 2)
      verifyListNode(nextNode, 2)
      verifyListNode(otherNode, 3)
      const list = new LinkedList(node, otherNode)
      verifyList(list, [1, 2, 3])
      verifyListNode(node, 1, 2)
      verifyListNode(nextNode, 2)
      verifyListNode(otherNode, 3)
    })
    it('two nodes with nexts get merged', () => {
      const firstNodeNext = new LinkedListNode(2)
      const firstNode = new LinkedListNode(1, firstNodeNext)
      const secondNodeNext = new LinkedListNode(4)
      const secondNode = new LinkedListNode(3, secondNodeNext)
      verifyListNode(firstNode, 1, 2)
      verifyListNode(firstNodeNext, 2)
      verifyListNode(secondNode, 3, 4)
      verifyListNode(secondNodeNext, 4)
      const list = new LinkedList(firstNode, secondNode)
      verifyList(list, [1, 2, 3, 4])
      verifyListNode(firstNode, 1, 2)
      verifyListNode(firstNodeNext, 2)
      verifyListNode(secondNode, 3, 4)
      verifyListNode(secondNodeNext, 4)
    })
  })
  describe('head', () => {
    it('returns undefined if not initialized', () => {
      expect(new LinkedList().head).toEqual(undefined)
    })
    it('returns node if initialized without next', () => {
      expect(new LinkedList(1).head).toEqual({
        _data: 1,
        next: undefined,
      })
    })
    it('returns node if initialized with next', () => {
      expect(new LinkedList(1, 2).head).toEqual({
        _data: 1,
        next: {
          _data: 2,
          next: undefined,
        },
      })
    })
  })
  describe('serialize', () => {
    it('returns empty string when empty', () => {
      expect(new LinkedList().serialize()).toEqual('||')
    })
    it('returns data for single', () => {
      expect(new LinkedList(1).serialize()).toEqual('|1|')
    })
    it('returns datas separated by arrow for double', () => {
      expect(new LinkedList(1, 2).serialize()).toEqual('|1->2|')
    })
    it('returns datas separated by arrow for triple', () => {
      expect(new LinkedList(1, 2, 3).serialize()).toEqual('|1->2->3|')
    })
  })
  describe('deserialize', () => {
    it('throws error for empty string', () => {
      expect(() => LinkedList.deserialize('')).toThrow(
        'Invalid LinkedListNode serialization string "": Must begin with character "|".'
      )
    })
    it('throws error if beginning character omitted', () => {
      expect(() => LinkedList.deserialize('a|')).toThrow(
        'Invalid LinkedListNode serialization string "a|": Must begin with character "|".'
      )
    })
    it('throws error if end character omitted', () => {
      expect(() => LinkedList.deserialize('|a')).toThrow(
        'Invalid LinkedListNode serialization string "|a": Must end with character "|".'
      )
    })
    it('converts to empty list if data is empty', () => {
      verifyList(LinkedList.deserialize('||'), [])
    })
    it('converts single string to single node list implicitly', () => {
      verifyList(LinkedList.deserialize('|a|'), ['a'])
    })
    it('converts single string to single node list explicitly', () => {
      verifyList(LinkedList.deserialize('|a|', String), ['a'])
    })
    it('converts single number to single node list', () => {
      verifyList(LinkedList.deserialize('|1|', Number), [1])
    })
    it('converts multiple numbers to multiple node list', () => {
      verifyList(LinkedList.deserialize('|1->2->3|', Number), [1, 2, 3])
    })
    it('converts multiple strings to multiple node list', () => {
      verifyList(LinkedList.deserialize('|a->b->c|'), ['a', 'b', 'c'])
    })
  })
  describe('add', () => {
    it('can add number to empty', () => {
      const list = new LinkedList()
      verifyList(list, [])
      verifyList(list.add(1), [1])
      verifyList(list, [1])
    })
    it('can add node to empty', () => {
      const list = new LinkedList()
      const node = new LinkedListNode(1)
      verifyList(list, [])
      verifyListNode(node, 1)
      verifyList(list.add(node), [1])
      verifyList(list, [1])
      verifyListNode(node, 1)
    })
    it('can add number to single node', () => {
      const list = new LinkedList(1)
      verifyList(list, [1])
      verifyList(list.add(2), [1, 2])
      verifyList(list, [1, 2])
    })
    it('can add node to single node', () => {
      const list = new LinkedList(1)
      const node = new LinkedListNode(2)
      verifyList(list, [1])
      verifyListNode(node, 2)
      verifyList(list.add(node), [1, 2])
      verifyList(list, [1, 2])
      verifyListNode(node, 2)
    })
    it('can add number to list with two nodes', () => {
      const list = new LinkedList(1, 2)
      verifyList(list, [1, 2])
      verifyList(list.add(3), [1, 2, 3])
      verifyList(list, [1, 2, 3])
    })
    it('can add node to list with two nodes', () => {
      const list = new LinkedList(1, 2)
      const node = new LinkedListNode(3)
      verifyList(list, [1, 2])
      verifyListNode(node, 3)
      verifyList(list.add(node), [1, 2, 3])
      verifyList(list, [1, 2, 3])
      verifyListNode(node, 3)
    })
    it('can add node with nexts to list', () => {
      const nextNode = new LinkedListNode(3)
      const node = new LinkedListNode(2, nextNode)
      const list = new LinkedList(1)
      verifyList(list, [1])
      verifyListNode(node, 2, 3)
      verifyListNode(nextNode, 3)
      verifyList(list.add(node), [1, 2, 3])
      verifyList(list, [1, 2, 3])
      verifyListNode(node, 2, 3)
      verifyListNode(nextNode, 3)
    })
    it('cannot add undefined to list', () => {
      const list = new LinkedList()
      verifyList(list, [])
      verifyList(list.add(undefined), [])
      verifyList(list, [])
    })
  })
  describe('reverse', () => {
    it('returns undefined when empty', () => {
      const list = new LinkedList()
      const reversed = list.reverse()
      verifyList(list, [])
      verifyList(reversed, [])
    })
    it('returns only item in single', () => {
      const list = new LinkedList(1)
      const reversed = list.reverse()
      verifyList(list, [1])
      verifyList(reversed, [1])
    })
    it('reverses list with two items smaller first', () => {
      const list = new LinkedList(1, 2)
      const reversed = list.reverse()
      verifyList(list, [2, 1])
      verifyList(reversed, [2, 1])
    })
    it('reverses list with two items larger first', () => {
      const list = new LinkedList(2, 1)
      const reversed = list.reverse()
      verifyList(list, [1, 2])
      verifyList(reversed, [1, 2])
    })
    it('reverses list with three items ascending order', () => {
      const list = new LinkedList(1, 2, 3)
      const reversed = list.reverse()
      verifyList(list, [3, 2, 1])
      verifyList(reversed, [3, 2, 1])
    })
    it('reverses list with three items descending order', () => {
      const list = new LinkedList(3, 2, 1)
      const reversed = list.reverse()
      verifyList(list, [1, 2, 3])
      verifyList(reversed, [1, 2, 3])
    })
    it('reverses list with three items mixed order', () => {
      const list = new LinkedList(2, 1, 3)
      const reversed = list.reverse()
      verifyList(list, [3, 1, 2])
      verifyList(reversed, [3, 1, 2])
    })
    it('reverses list with four items', () => {
      const list = new LinkedList(2, 1, 4, 3)
      const reversed = list.reverse()
      verifyList(list, [3, 4, 1, 2])
      verifyList(reversed, [3, 4, 1, 2])
    })
  })
})

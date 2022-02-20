import Queue from '../../src/queue'
import { verifyQueue } from './helpers'

describe('Queue Unit Tests', () => {
  describe('constructor', () => {
    it('can create without parameters', () => {
      verifyQueue(new Queue(), [])
    })
    it('can create with one parameter', () => {
      verifyQueue(new Queue(1), [1])
    })
    it('can create with two parameters', () => {
      verifyQueue(new Queue(1, 2), [1, 2])
    })
    it('can create with three parameters', () => {
      verifyQueue(new Queue(1, 2, 3), [1, 2, 3])
    })
  })
  describe('serialize', () => {
    it('returns empty string for empty', () => {
      expect(new Queue().serialize()).toEqual('||')
    })
    it('returns data for single', () => {
      expect(new Queue(1).serialize()).toEqual('|1|')
    })
    it('returns datas separated by arrow for double', () => {
      expect(new Queue(1, 2).serialize()).toEqual('|1->2|')
    })
    it('returns datas separated by arrow for double', () => {
      expect(new Queue(1, 2, 3).serialize()).toEqual('|1->2->3|')
    })
  })
  describe('deserialize', () => {
    it('throws error for empty string', () => {
      expect(() => Queue.deserialize('')).toThrow(
        'Invalid Queue serialization string "": Must begin with character "|".'
      )
    })
    it('throws error if beginning character omitted', () => {
      expect(() => Queue.deserialize('a|')).toThrow(
        'Invalid Queue serialization string "a|": Must begin with character "|".'
      )
    })
    it('throws error if end character omitted', () => {
      expect(() => Queue.deserialize('|a')).toThrow(
        'Invalid Queue serialization string "|a": Must end with character "|".'
      )
    })
    it('converts to empty queue if data is empty', () => {
      verifyQueue(Queue.deserialize('||'), [])
    })
    it('converts single string to single node queue implicitly', () => {
      verifyQueue(Queue.deserialize('|a|'), ['a'])
    })
    it('converts single string to single node queue explicitly', () => {
      verifyQueue(Queue.deserialize('|a|', String), ['a'])
    })
    it('converts single number to single node queue', () => {
      verifyQueue(Queue.deserialize('|1|', Number), [1])
    })
    it('converts multiple numbers to multiple node queue', () => {
      verifyQueue(Queue.deserialize('|1->2->3|', Number), [1, 2, 3])
    })
    it('converts multiple strings to multiple node queue', () => {
      verifyQueue(Queue.deserialize('|a->b->c|'), ['a', 'b', 'c'])
    })
  })
  describe('enqueue', () => {
    it('throws error for empty string', () => {
      expect(() => new Queue().enqueue('')).toThrow('Data for Queue node cannot be empty string.')
    })
    it('can add when empty', () => {
      const queue = new Queue()
      verifyQueue(queue.enqueue(1), [1])
      verifyQueue(queue, [1])
    })
    it('can add to single', () => {
      const queue = new Queue(1)
      verifyQueue(queue.enqueue(2), [1, 2])
      verifyQueue(queue, [1, 2])
    })
    it('can add to double', () => {
      const queue = new Queue(1, 2)
      verifyQueue(queue.enqueue(3), [1, 2, 3])
      verifyQueue(queue, [1, 2, 3])
    })
    it('cannot add undefined item', () => {
      const queue = new Queue()
      verifyQueue(queue.enqueue(undefined), [])
      verifyQueue(queue, [])
    })
  })
  describe('dequeue', () => {
    it('returns undefined when empty', () => {
      const queue = new Queue()
      verifyQueue(queue, [])
      expect(queue.dequeue()).toEqual(undefined)
      verifyQueue(queue, [])
    })
    it('returns only item and empties single item queue', () => {
      const queue = new Queue(1)
      verifyQueue(queue, [1])
      expect(queue.dequeue()).toEqual(1)
      verifyQueue(queue, [])
    })
    it('returns front of queue and leaves only one item in double item queue', () => {
      const queue = new Queue(1, 2)
      verifyQueue(queue, [1, 2])
      expect(queue.dequeue()).toEqual(1)
      verifyQueue(queue, [2])
    })
    it('item can be added to queue after all items dequeued', () => {
      const queue = new Queue(1)
      verifyQueue(queue, [1])
      expect(queue.dequeue()).toEqual(1)
      verifyQueue(queue, [])
      verifyQueue(queue.enqueue(2), [2])
      verifyQueue(queue, [2])
    })
  })
  describe('peek', () => {
    it('returns undefined when empty', () => {
      const queue = new Queue()
      verifyQueue(queue, [])
      expect(queue.peek()).toEqual(undefined)
      verifyQueue(queue, [])
    })
    it('returns only item from single', () => {
      const queue = new Queue(1)
      verifyQueue(queue, [1])
      expect(queue.peek()).toEqual(1)
      verifyQueue(queue, [1])
    })
    it('returns top item from double', () => {
      const queue = new Queue(1, 2)
      verifyQueue(queue, [1, 2])
      expect(queue.peek()).toEqual(1)
      verifyQueue(queue, [1, 2])
    })
    it('returns top item from triple', () => {
      const queue = new Queue(1, 2, 3)
      verifyQueue(queue, [1, 2, 3])
      expect(queue.peek()).toEqual(1)
      verifyQueue(queue, [1, 2, 3])
    })
    it('returns undefined after all items removed', () => {
      const queue = new Queue(1)
      verifyQueue(queue, [1])
      expect(queue.peek()).toEqual(1)
      verifyQueue(queue, [1])
      expect(queue.dequeue()).toEqual(1)
      verifyQueue(queue, [])
      expect(queue.peek()).toEqual(undefined)
      verifyQueue(queue, [])
    })
  })
})

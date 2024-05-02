import LinkedList from './linked-list.mjs'
import LinkedListNode from './linked-list-node.mjs'
import { replaceInErrorMessage } from './error-util.mjs'

/**
 * A data structure containing items with First In First Out (FIFO) access
 */
export default class Queue<T> {
  private _list: LinkedList<T>

  /**
   * Create a new Queue instance.
   *
   * @param items The items to add to the stack with first being put at the front.
   */
  constructor(...items: T[]) {
    this._list = new LinkedList<T>()
    for (const item of items) {
      this.enqueue(item)
    }
  }

  /**
   * Converts the queue into it's string representation.
   *
   * @returns A string representation of the queue, with pipe ("|") denoting beginning and end, and arrows ("->") separating successive next nodes.
   */
  serialize(): string {
    return this._list.serialize()
  }

  /**
   * Converts string representation of a queue into a Queue object.
   *
   * @param serialization The string representing the queue.
   * @param castFromString The function to use when casting node data from its string representation to the desired T type.
   * @returns The Queue object as defined in the serialization string.
   */
  static deserialize<T>(serialization: string, castFromString?: (nodeData: string) => T): Queue<T> {
    const queue = new Queue<T>()
    if (serialization === `${LinkedListNode.SEPARATOR.Ends}${LinkedListNode.SEPARATOR.Ends}`) {
      return queue
    }
    let list: LinkedListNode<T> | undefined = replaceInErrorMessage({
      operation: () => LinkedListNode.deserialize<T>(serialization, castFromString),
      from: LinkedListNode.name,
      to: Queue.name,
    })
    while (list !== undefined) {
      queue.enqueue(list.data)
      list = list.next
    }
    return queue
  }

  /**
   * Adds a new item to the end of the queue.
   *
   * @param item The new item to add to the end of the queue.
   * @returns The queue with the new item added.
   */
  enqueue(item: T): Queue<T> {
    if (item !== undefined) {
      replaceInErrorMessage({
        operation: () => this._list.add(item),
        from: LinkedListNode.name,
        to: `${Queue.name} node`,
      })
    }
    return this
  }

  /**
   * Removes the front item from the queue and returns it.
   *
   * @returns The first item in the stack (i.e. first item enqueued), undefined if empty.
   */
  dequeue(): T | undefined {
    const oldHead = this._list.head
    if (oldHead) {
      this._list = new LinkedList()
      if (oldHead.next) {
        this._list.add(oldHead.next)
      }
    }
    return oldHead?.data
  }

  /**
   * Gets the front item in the queue (i.e. first item pushed) without removing it.
   *
   * @returns The front item in the queue (i.e. first item pushed), undefined if empty.
   */
  peek(): T | undefined {
    return this._list.head?.data
  }
}

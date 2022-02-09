import LinkedList from './linked-list'

/**
 * A data structure containing items with First In First Out (FIFO) access
 */
export default class Queue {
  private _list: LinkedList

  /**
   * Create a new Queue instance.
   *
   * @param items The items to add to the stack with first being put at the front.
   */
  constructor(...items: any[]) {
    this._list = new LinkedList()
    for (const item of items) {
      this._list.add(item)
    }
  }

  /**
   * Converts the queue into it's string representation.
   *
   * @returns A string representation of the queue, with arrow (" -> ") separators between items.
   */
  serialize(): string {
    return this._list.serialize() || ''
  }

  /**
   * Adds a new item to the end of the queue.
   *
   * @param item The new item to add to the end of the queue.
   * @returns The queue with the new item added.
   */
  enqueue(item: any): Queue {
    if (item !== undefined) {
      this._list.add(item)
    }
    return this
  }

  /**
   * Removes the front item from the queue and returns it.
   *
   * @returns The first item in the stack (i.e. first item enqueued), undefined if empty.
   */
  dequeue(): any | undefined {
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
  peek(): any | undefined {
    return this._list.head?.data
  }
}

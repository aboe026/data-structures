import LinkedList from '../src/linked-list'
import LinkedListNode from './linked-list-node'

/**
 * A data structure containing items with Last In First Out (LIFO) access.
 */
export default class Stack {
  private _list: LinkedList

  /**
   * Create a new Stack instance.
   *
   * @param items The items to add to the stack with first being put on bottom.
   */
  constructor(...items: any[]) {
    this._list = new LinkedList()
    for (const item of items) {
      this.push(item)
    }
  }

  /**
   * Converts the stack into it's string representation.
   *
   * @returns A string representation of the stack, with arrow (" -> ") separators between items.
   */
  serialize(): string {
    return this._list.serialize() || ''
  }

  /**
   * Adds a new item to the top of the stack.
   *
   * @param item The new item to add to the top of the stack.
   * @returns The stack with the new item added.
   */
  push(item: any): Stack {
    if (item !== undefined) {
      this._list = new LinkedList(new LinkedListNode(item, this._list.head))
    }
    return this
  }

  /**
   * Removes the top item from the stack and returns it.
   *
   * @returns The top item in the stack (i.e. last item pushed), undefined if empty.
   */
  pop(): any | undefined {
    const head = this._list.head
    if (head) {
      this._list = new LinkedList(head.next)
      return head.data
    }
  }

  /**
   * Gets the top item in the stack (i.e. last item pushed) without removing it.
   *
   * @returns The top item in the stack (i.e. last item pushed), undefined if empty.
   */
  peek(): any | undefined {
    return this._list.head?.data
  }
}

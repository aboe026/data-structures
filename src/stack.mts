import LinkedList from '../src/linked-list.mjs'
import LinkedListNode from './linked-list-node.mjs'
import { replaceInErrorMessage } from './error-util.mjs'

/**
 * A data structure containing items with Last In First Out (LIFO) access.
 */
export default class Stack<T> {
  private _list: LinkedList<T>

  /**
   * Create a new Stack instance.
   *
   * @param items The items to add to the stack with first being put on bottom.
   */
  constructor(...items: T[]) {
    this._list = new LinkedList<T>()
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
    return this._list.serialize()
  }

  /**
   * Converts string representation of a queue into a Stack object.
   *
   * @param serialization The string representing the stack.
   * @param castFromString The function to use when casting node data from its string representation to the desired T type.
   * @returns The Stack object as defined in the serialization string.
   */
  static deserialize<T>(serialization: string, castFromString?: (nodeData: string) => T): Stack<T> {
    const stack = new Stack<T>()
    if (serialization === `${LinkedListNode.SEPARATOR.Ends}${LinkedListNode.SEPARATOR.Ends}`) {
      return stack
    }
    let list: LinkedListNode<T> | undefined = replaceInErrorMessage({
      operation: () => LinkedListNode.deserialize<T>(serialization, castFromString),
      from: LinkedListNode.name,
      to: Stack.name,
    })
    while (list !== undefined) {
      stack.push(list.data)
      list = list.next
    }
    return stack
  }

  /**
   * Adds a new item to the top of the stack.
   *
   * @param item The new item to add to the top of the stack.
   * @returns The stack with the new item added.
   */
  push(item: T): Stack<T> {
    if (item !== undefined) {
      this._list = replaceInErrorMessage({
        operation: () => new LinkedList(new LinkedListNode(item, this._list.head)),
        from: LinkedListNode.name,
        to: `${Stack.name} node`,
      })
    }
    return this
  }

  /**
   * Removes the top item from the stack and returns it.
   *
   * @returns The top item in the stack (i.e. last item pushed), undefined if empty.
   */
  pop(): T | undefined {
    const head = this._list.head
    if (head) {
      this._list = head.next ? new LinkedList<T>(head.next) : new LinkedList<T>()
      return head.data
    }
  }

  /**
   * Gets the top item in the stack (i.e. last item pushed) without removing it.
   *
   * @returns The top item in the stack (i.e. last item pushed), undefined if empty.
   */
  peek(): T | undefined {
    return this._list.head?.data
  }
}

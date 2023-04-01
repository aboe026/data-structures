import LinkedListNode, { isLinkedListNode } from './linked-list-node'

/**
 * A data structure for storing LinkedListNodes sequentially.
 */
export default class LinkedList<T> {
  private _head: LinkedListNode<T> | undefined = undefined

  /**
   * Creates a new LinkedList instance.
   *
   * @param nodes Any number of nodes or items to initialize the list with.
   */
  constructor(...nodes: (LinkedListNode<T> | T)[]) {
    for (const node of nodes) {
      this.add(node)
    }
  }

  /**
   * The first node in the list, undefined if empty.
   */
  get head(): LinkedListNode<T> | undefined {
    return this._head
  }

  /**
   * Converts the list into it's string representation.
   *
   * @returns A string representation of the list, with pipe ("|") denoting beginning and end, and arrows ("->") separating successive next nodes.
   */
  serialize(): string {
    return this._head?.serialize() || `${LinkedListNode.SEPARATOR.Ends}${LinkedListNode.SEPARATOR.Ends}`
  }

  /**
   * Converts string representation of a list into a LinkedList object.
   *
   * @param serialization The string representing the list.
   * @param castFromString The function to use when casting node data from its string representation to the desired T type.
   * @returns The LinkedList object as defined in the serialization string.
   */
  static deserialize<T>(serialization: string, castFromString?: (nodeData: string) => T): LinkedList<T> {
    if (serialization === `${LinkedListNode.SEPARATOR.Ends}${LinkedListNode.SEPARATOR.Ends}`) {
      return new LinkedList<T>()
    }
    return new LinkedList<T>(LinkedListNode.deserialize<T>(serialization, castFromString))
  }

  /**
   * Insert a new node to the end of the list. Does not alter nodes passed in.
   *
   * @param node The item to add to the end of the list.
   * @returns The list with the item added to the end of it.
   */
  add(node: LinkedListNode<T> | T): LinkedList<T> {
    if (node !== undefined) {
      if (isLinkedListNode(node)) {
        let current: LinkedListNode<T> | undefined = node
        while (current) {
          this.add(current.data)
          current = current.next
        }
      } else {
        const newNode = new LinkedListNode(node)
        if (!this._head) {
          this._head = newNode
        } else {
          let current: LinkedListNode<T> = this._head
          while (current && current.next !== undefined) {
            current = current.next
          }
          if (current) {
            current.next = newNode
          }
        }
      }
    }
    return this
  }

  /**
   * Reverses nodes such that the first becomes last, and last becomes first.
   *
   * @returns The list in reversed order.
   */
  reverse(): LinkedList<T> {
    let previous = undefined
    let current = this._head
    let next = this._head?.next
    while (current !== undefined) {
      current.next = previous
      previous = current
      current = next
      next = next?.next
    }
    this._head = previous
    return this
  }
}

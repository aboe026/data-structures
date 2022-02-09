import LinkedListNode, { isLinkedListNode } from './linked-list-node'

/**
 * A data structure for storing LinkedListNodes sequentially.
 */
export default class LinkedList {
  private _head: LinkedListNode | undefined = undefined

  /**
   * Creates a new LinkedList instance.
   *
   * @param nodes Any number of nodes or items to initialize the list with.
   */
  constructor(...nodes: LinkedListNode | any) {
    for (const node of nodes) {
      this.add(node)
    }
  }

  /**
   * The first node in the list.
   */
  get head(): LinkedListNode | undefined {
    return this._head
  }

  /**
   * Converts the list into it's string representation.
   *
   * @returns A string representation of the list, with arrow (" -> ") separators between nodes.
   */
  serialize(): string {
    return this._head?.serialize() || ''
  }

  /**
   * Insert a new node to the end of the list.
   *
   * @param node The item to add to the end of the list.
   * @returns The list with the item added to the end of it.
   */
  add(node: LinkedListNode | any): LinkedList {
    if (node !== undefined) {
      if (!this._head) {
        if (isLinkedListNode(node)) {
          this._head = node
        } else {
          this._head = new LinkedListNode(node)
        }
      } else {
        let current: LinkedListNode = this._head
        while (current && current.next !== undefined) {
          current = current.next
        }
        if (current) {
          if (isLinkedListNode(node)) {
            current.next = node
          } else {
            current.next = new LinkedListNode(node)
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
  reverse(): LinkedList {
    let previous = undefined
    let current = this._head
    let next = this._head?.next
    while (current !== undefined) {
      if (current) {
        current.next = previous
      }
      previous = current
      current = next
      next = next?.next
    }
    this._head = previous
    return this
  }
}

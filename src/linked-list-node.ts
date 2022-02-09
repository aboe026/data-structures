/**
 * A data structure for storing data related to other data.
 *
 * Contains a data element and a next element, which optionally points to another LinkedListNode.
 */
export default class LinkedListNode {
  private _data: any
  /**
   * Optional pointer to another LinkedListNode.
   */
  next: LinkedListNode | undefined

  /**
   * Creates a new LinkedListNode instance.
   *
   * @param data The data to store in the node.
   * @param next Optionally point this node to another node.
   */
  constructor(data: any, next?: LinkedListNode) {
    this._data = data
    this.next = next
  }

  /**
   * The data stored in the node.
   */
  get data(): any {
    return this._data
  }

  /**
   * Converts the node into it's string representation.
   *
   * @returns A string representation of the node, with arrow (" -> ") separators between successive next nodes.
   */
  serialize(): string {
    let serialization = `${this._data}`
    let next = this.next
    while (next) {
      serialization += ` -> ${next._data}`
      next = next.next
    }
    return serialization
  }
}

/**
 * Determines whether an item is a LinkedListNode or not.
 *
 * @param node The item to determine if it is a LinkedListNode or not.
 * @returns True if item is a LinkedListNode, false otherwise.
 */
export function isLinkedListNode(node: LinkedListNode | any): node is LinkedListNode {
  if (!node) {
    return false
  }
  const keys = Object.keys(node)
  return keys.length === 2 && keys.includes('_data') && keys.includes('next')
}

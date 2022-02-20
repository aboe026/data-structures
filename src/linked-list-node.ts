/**
 * A data structure for storing data related another possible sequential data.
 *
 * Contains a data element and a next element, which optionally points to another LinkedListNode.
 */
export default class LinkedListNode<T> {
  /**
   * Characters used for separation in serialization
   */
  static readonly SEPARATOR = {
    Ends: '|',
    Nodes: '->',
  }
  private _data: T
  /**
   * Optional pointer to another LinkedListNode.
   */
  next: LinkedListNode<T> | undefined

  /**
   * Creates a new LinkedListNode instance.
   *
   * @param data The data to store in the node.
   * @param next Optionally point this node to another node.
   */
  constructor(data: T, next?: LinkedListNode<T>) {
    if (typeof data === 'string' && data === '') {
      throw Error('Data for LinkedListNode cannot be empty string.')
    }
    this._data = data
    this.next = next
  }

  /**
   * The data stored in the node.
   */
  get data(): T {
    return this._data
  }

  /**
   * Converts the node into it's string representation.
   *
   * @returns A string representation of the node, with pipe ("|") denoting beginning and end, and arrows ("->") separating successive next nodes.
   */
  serialize(): string {
    let serialization = `${LinkedListNode.SEPARATOR.Ends}${this._data}`
    let next = this.next
    while (next) {
      serialization += `${LinkedListNode.SEPARATOR.Nodes}${next._data}`
      next = next.next
    }
    serialization += LinkedListNode.SEPARATOR.Ends
    return serialization
  }

  /**
   * Converts string representation of a node into a LinkedListNode object.
   *
   * @param serialization The string representing the node and any subsequent nodes it is connected to.
   * @param castFromString The function to use when casting node data from its string representation to the desired T type.
   * @returns The LinkedListNode object as defined in the serialization string.
   */
  static deserialize<T>(serialization: string, castFromString?: (nodeData: string) => T): LinkedListNode<T> {
    if (!serialization.startsWith(LinkedListNode.SEPARATOR.Ends)) {
      throw Error(
        `Invalid LinkedListNode serialization string "${serialization}": Must begin with character "${LinkedListNode.SEPARATOR.Ends}".`
      )
    }
    if (!serialization.endsWith(LinkedListNode.SEPARATOR.Ends)) {
      throw Error(
        `Invalid LinkedListNode serialization string "${serialization}": Must end with character "${LinkedListNode.SEPARATOR.Ends}".`
      )
    }
    const serializationWithouEnds = serialization.substring(0, serialization.length - 1).substring(1)
    const datas: T[] = serializationWithouEnds.split(LinkedListNode.SEPARATOR.Nodes).map((datum) => {
      if (castFromString) {
        return castFromString(datum)
      }
      return datum as unknown as T
    })
    const node = new LinkedListNode(datas[0])
    for (let i = 1; i < datas.length; i++) {
      let current = node
      while (current.next !== undefined) {
        current = current.next
      }
      current.next = new LinkedListNode(datas[i])
    }
    return node
  }
}

/**
 * Determines whether an item is a LinkedListNode or not.
 *
 * @param node The item to determine if it is a LinkedListNode or not.
 * @returns True if item is a LinkedListNode, false otherwise.
 */
export function isLinkedListNode<T>(node: LinkedListNode<T> | T): node is LinkedListNode<T> {
  if (!node) {
    return false
  }
  const keys = Object.keys(node)
  return keys.length === 2 && keys.includes('_data') && keys.includes('next')
}

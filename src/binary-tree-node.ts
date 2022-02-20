/**
 * A data structure for storing data related to two other possible sequential data.
 */
export default class BinaryTreeNode<T> {
  /**
   * Characters used for separation in serialization
   */
  static readonly SEPARATOR = {
    Children: '<>',
    ChildPairs: '|',
    Levels: '\n',
  }
  private _data: T
  left?: BinaryTreeNode<T>
  right?: BinaryTreeNode<T>

  /**
   * Creates a new BinaryTreeNode instance.
   *
   * @param input The data to store in the node and optionall pointers to child nodes.
   */
  constructor(data: T, children?: BinaryTreeNodeChildren<T>) {
    if (typeof data === 'string' && data === '') {
      throw Error('Data for BinaryTreeNode cannot be empty string.')
    }
    this._data = data
    this.left = children?.left
    this.right = children?.right
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
   * @returns A string representation of the node, with less-than greater-than  ("<>") separators between children, pipes ("|") surrounding child pairs, and newlines ("\n") separating levels.
   */
  serialize(): string {
    let serialization = ''
    let level: (BinaryTreeNode<T> | undefined)[] = [this]
    let nextLevel: (BinaryTreeNode<T> | undefined)[]
    while (level.length > 0) {
      serialization += BinaryTreeNode.SEPARATOR.ChildPairs
      nextLevel = []
      let nextLevelHasNodes = false
      for (let i = 0; i < level.length; i++) {
        const node = level[i]
        serialization += `${node?.data || ''}`
        if (i < level.length - 1) {
          serialization += `${i % 2 === 0 ? BinaryTreeNode.SEPARATOR.Children : BinaryTreeNode.SEPARATOR.ChildPairs}`
        }
        if (node?.left || node?.right) {
          nextLevelHasNodes = true
        }
        nextLevel.push(node?.left)
        nextLevel.push(node?.right)
      }
      serialization += BinaryTreeNode.SEPARATOR.ChildPairs
      if (nextLevelHasNodes) {
        serialization += BinaryTreeNode.SEPARATOR.Levels
      }
      level = nextLevelHasNodes ? nextLevel : []
    }
    return serialization
  }

  /**
   * Converts string representation of a node into a BinaryTreeNode object.
   *
   * @param serialization The string representing the node and any subsequent nodes it is connected to.
   * @param castFromString The function to use when casting node data from its string representation to the desired T type.
   * @returns The BinaryTreeNode object as defined in the serialization string.
   */
  static deserialize<T>(serialization: string, castFromString?: (nodeData: string) => T): BinaryTreeNode<T> {
    const levels = serialization.split(BinaryTreeNode.SEPARATOR.Levels)
    let previousLevel: (BinaryTreeNode<T> | undefined)[] = []
    let node: BinaryTreeNode<T> | undefined
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i]
      if (!level.startsWith(BinaryTreeNode.SEPARATOR.ChildPairs)) {
        throw Error(
          `Invalid BinaryTreeNode serialization string for level "${level}": Must begin with character "${BinaryTreeNode.SEPARATOR.ChildPairs}".`
        )
      }
      if (!level.endsWith(BinaryTreeNode.SEPARATOR.ChildPairs)) {
        throw Error(
          `Invalid BinaryTreeNode serialization string for level "${level}": Must end with character "${BinaryTreeNode.SEPARATOR.ChildPairs}".`
        )
      }
      const levelWithouEnds = level.substring(0, level.length - 1).substring(1)
      const currentLevel: (BinaryTreeNode<T> | undefined)[] = []
      const pairs = levelWithouEnds.split(BinaryTreeNode.SEPARATOR.ChildPairs)
      const expectedPairs = i === 0 ? 1 : Math.pow(2, i - 1)
      if (pairs.length !== expectedPairs) {
        throw Error(
          `Invalid number of pairs for level "${level}": BinaryTreeNode needs to have "${expectedPairs}" pairs at level "${i}".`
        )
      }
      for (let j = 0; j < pairs.length; j++) {
        const pair = pairs[j]
        const parent = previousLevel && previousLevel[j]
        const children = pair.split(BinaryTreeNode.SEPARATOR.Children)
        if (children.length > 2) {
          throw Error(
            `Invalid number of children for pair "${pair}": BinaryTreeNode can only have "2" children maximum.`
          )
        }
        for (let k = 0; k < children.length; k++) {
          const data = children[k]
          let newNode: BinaryTreeNode<T> | undefined
          if (data !== '') {
            newNode = new BinaryTreeNode((castFromString ? castFromString(data) : data) as unknown as T)
          }
          currentLevel.push(newNode)
          if (i !== 0 && newNode && !parent) {
            throw Error(`Invalid parent-less children "${pair}": BinaryTreeNode children must have parent with data.`)
          }
          if (newNode && parent) {
            parent[k === 0 ? 'left' : 'right'] = newNode
          } else if (newNode) {
            node = newNode
          }
        }
      }
      previousLevel = currentLevel
    }

    if (node === undefined) {
      throw Error(
        `Invalid BinaryTreeNode serialization string "${serialization}": Must contain at least one node of data.`
      )
    }

    return node
  }
}

/**
 * Determines whether an item is a BinaryTreeNode or not.
 *
 * @param node The item to determine if it is a BinaryTreeNode or not.
 * @returns True if item is a BinaryTreeNode, false otherwise.
 */
export function isBinaryTreeNode<T>(node: BinaryTreeNode<T> | T): node is BinaryTreeNode<T> {
  if (!node) {
    return false
  }
  const keys = Object.keys(node)
  return keys.length === 3 && keys.includes('_data') && keys.includes('left') && keys.includes('right')
}

type BinaryTreeNodeChildren<T> = {
  left?: BinaryTreeNode<T>
  right?: BinaryTreeNode<T>
}

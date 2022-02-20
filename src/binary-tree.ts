import BinaryTreeNode, { isBinaryTreeNode } from './binary-tree-node'
import Queue from './queue'
import { replaceInErrorMessage } from './error-util'

/**
 * A data structure for storing BinaryTreeNodes sequentially.
 */
export default class BinaryTree<T> {
  private _root: BinaryTreeNode<T> | undefined = undefined

  /**
   * Creates a new BinaryTree instance.
   *
   * @param nodes Any number of nodes or items to initialize the tree with.
   */
  constructor(...nodes: (BinaryTreeNode<T> | T)[]) {
    for (const node of nodes) {
      if (this._root === undefined && isBinaryTreeNode(node)) {
        this._root = BinaryTreeNode.deserialize(node.serialize())
      } else {
        this.add(node)
      }
    }
  }

  /**
   * The top node in the tree (i.e. first item added), undefined if empty.
   */
  get root(): BinaryTreeNode<T> | undefined {
    return this._root
  }

  /**
   * Converts the tree into it's string representation.
   *
   * @returns  A string representation of the tree, with less-than greater-than  ("<>") separators between children, pipes ("|") separating child pairs, and newlines ("\n") separating levels.
   */
  serialize(): string {
    return this._root?.serialize() || `${BinaryTreeNode.SEPARATOR.ChildPairs}${BinaryTreeNode.SEPARATOR.ChildPairs}`
  }

  /**
   * Converts string representation of a tree into a BinaryTree object.
   *
   * @param serialization The string representing the tree.
   * @param castFromString The function to use when casting node data from its string representation to the desired T type.
   * @returns The BinaryTree object as defined in the serialization string.
   */
  static deserialize<T>(serialization: string, castFromString?: (nodeData: string) => T): BinaryTree<T> {
    if (serialization === `${BinaryTreeNode.SEPARATOR.ChildPairs}${BinaryTreeNode.SEPARATOR.ChildPairs}`) {
      return new BinaryTree<T>()
    }
    return replaceInErrorMessage({
      operation: () => new BinaryTree<T>(BinaryTreeNode.deserialize<T>(serialization, castFromString)),
      from: `Invalid ${BinaryTreeNode.name} serialization`,
      to: `Invalid ${BinaryTree.name} serialization`,
    })
  }

  /**
   * Insert a new node to the first availabile spot in the tree (breadth-first traversal). Does not alter nodes passed in.
   *
   * @param node The item to add to the first available spot in the tree.
   * @returns The tree with the item added to it.
   */
  add(node: BinaryTreeNode<T> | T): BinaryTree<T> {
    if (node !== undefined) {
      if (isBinaryTreeNode(node)) {
        const nodes = new Queue(node)
        while (nodes.peek() !== undefined) {
          const newNode = nodes.dequeue()
          if (newNode) {
            this.add(newNode.data)
            if (newNode.left) {
              nodes.enqueue(newNode.left)
            }
            if (newNode.right) {
              nodes.enqueue(newNode.right)
            }
          }
        }
      } else {
        const newNode: BinaryTreeNode<T> = replaceInErrorMessage({
          operation: () => new BinaryTreeNode<T>(node),
          from: BinaryTreeNode.name,
          to: `${BinaryTree.name} node`,
        })
        if (!this._root) {
          this._root = newNode
        } else {
          const existingNodes = new Queue(this._root)
          while (existingNodes.peek() !== undefined) {
            const existingNode = existingNodes.dequeue()
            if (existingNode) {
              if (existingNode.left) {
                existingNodes.enqueue(existingNode.left)
              } else {
                existingNode.left = newNode
                break
              }
              if (existingNode.right) {
                existingNodes.enqueue(existingNode.right)
              } else {
                existingNode.right = newNode
                break
              }
            }
          }
        }
      }
    }
    return this
  }
}

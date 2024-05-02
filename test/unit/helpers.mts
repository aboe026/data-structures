import BinaryTree from '../../src/binary-tree.mjs'
import BinaryTreeNode from '../../src/binary-tree-node.mjs'
import LinkedList from '../../src/linked-list.mjs'
import LinkedListNode from '../../src/linked-list-node.mjs'
import Queue from '../../src/queue.mjs'
import Stack from '../../src/stack.mjs'

export function verifyListNode<T>(actual: LinkedListNode<T>, ...expected: any[]) {
  expect(actual.serialize()).toEqual(serializeExpectedListNodes(expected))
}

export function verifyList<T>(actual: LinkedList<T>, expected: any[]) {
  expect(actual.serialize()).toEqual(serializeExpectedListNodes(expected))
}

export function verifyTree<T>(actual: BinaryTree<T>, expected: any[]) {
  expect(actual.serialize()).toEqual(serializeExpectedTreeNodes(expected))
}

export function verifyStack<T>(actual: Stack<T>, expected: any[]) {
  expect(actual.serialize()).toEqual(serializeExpectedListNodes(expected))
}

export function verifyQueue<T>(actul: Queue<T>, expected: any[]) {
  expect(actul.serialize()).toEqual(serializeExpectedListNodes(expected))
}

export function verifyTreeNode<T>(actual: BinaryTreeNode<T>, ...expected: any[]) {
  expect(actual.serialize()).toEqual(serializeExpectedTreeNodes(expected))
}

export function serializeExpectedListNodes(data?: any[]): string {
  let expected = LinkedListNode.SEPARATOR.Ends
  if (data) {
    for (let i = 0; i < data.length; i++) {
      expected += `${data[i]}${i === data.length - 1 ? '' : LinkedListNode.SEPARATOR.Nodes}`
    }
  }
  expected += LinkedListNode.SEPARATOR.Ends
  return expected
}

export function serializeExpectedTreeNodes(data?: any[]): string {
  let expected = BinaryTreeNode.SEPARATOR.ChildPairs
  if (data) {
    let level = 0
    for (let i = 0; i < data.length; i++) {
      const root = i === 0
      const lastNodeInTree = i === data.length - 1
      const firstNodeInLevel = root || i === Math.pow(2, level) - 1
      const lastNodeInLevel = root || i === Math.pow(2, level + 1) - 2
      const leftChild = i % 2 === 1
      const rightChild = i % 2 === 0

      if (firstNodeInLevel && !root) {
        expected += BinaryTreeNode.SEPARATOR.ChildPairs
      }

      expected += data[i]

      if (leftChild) {
        expected += BinaryTreeNode.SEPARATOR.Children
      }
      if (rightChild && !lastNodeInTree) {
        expected += BinaryTreeNode.SEPARATOR.ChildPairs
      }

      if (lastNodeInLevel) {
        level++
        if (!lastNodeInTree) {
          expected += BinaryTreeNode.SEPARATOR.Levels
        }
      }
    }
  }
  expected += BinaryTreeNode.SEPARATOR.ChildPairs
  return expected
}

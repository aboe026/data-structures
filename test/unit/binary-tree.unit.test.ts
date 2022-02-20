import BinaryTree from '../../src/binary-tree'
import BinaryTreeNode from '../../src/binary-tree-node'

import { verifyTree, verifyTreeNode } from './helpers'

describe('Binary Tree Unit Tests', () => {
  describe('constructor', () => {
    it('can create without parameters', () => {
      verifyTree(new BinaryTree(), [])
    })
    it('can create from number', () => {
      const tree = new BinaryTree(1)
      verifyTree(tree, [1])
    })
    it('can create from string', () => {
      const tree = new BinaryTree('1')
      verifyTree(tree, ['1'])
    })
    it('can create from node without children', () => {
      const node = new BinaryTreeNode(1)
      verifyTreeNode(node, 1)
      const tree = new BinaryTree(node)
      verifyTree(tree, [1])
      verifyTreeNode(node, 1)
    })
    it('can create from node with a left child', () => {
      const childNode = new BinaryTreeNode(2)
      const node = new BinaryTreeNode(1, {
        left: childNode,
      })
      verifyTreeNode(node, 1, 2)
      verifyTreeNode(childNode, 2)
      const tree = new BinaryTree(node)
      verifyTree(tree, [1, 2])
      verifyTreeNode(node, 1, 2)
      verifyTreeNode(childNode, 2)
    })
    it('can create from node with a right child', () => {
      const childNode = new BinaryTreeNode(2)
      const node = new BinaryTreeNode(1, {
        right: childNode,
      })
      verifyTreeNode(node, 1, '', 2)
      verifyTreeNode(childNode, 2)
      const tree = new BinaryTree(node)
      verifyTree(tree, [1, '', 2])
      verifyTreeNode(node, 1, '', 2)
      verifyTreeNode(childNode, 2)
    })
    it('can create from node with both children', () => {
      const leftChild = new BinaryTreeNode(2)
      const rightChild = new BinaryTreeNode(3)
      const node = new BinaryTreeNode(1, {
        left: leftChild,
        right: rightChild,
      })
      verifyTreeNode(node, 1, 2, 3)
      verifyTreeNode(leftChild, 2)
      verifyTreeNode(rightChild, 3)
      const tree = new BinaryTree(node)
      verifyTree(tree, [1, 2, 3])
      verifyTreeNode(node, 1, 2, 3)
      verifyTreeNode(leftChild, 2)
      verifyTreeNode(rightChild, 3)
    })
    it('can create from multiple numbers', () => {
      verifyTree(new BinaryTree(1, 2), [1, 2])
    })
    it('can create from multiple nodes', () => {
      const node = new BinaryTreeNode(1)
      const otherNode = new BinaryTreeNode(2)
      verifyTreeNode(node, 1)
      verifyTreeNode(otherNode, 2)
      const tree = new BinaryTree(node, otherNode)
      verifyTree(tree, [1, 2])
      verifyTreeNode(node, 1)
      verifyTreeNode(otherNode, 2)
    })
    it('can create from multiple mixed', () => {
      const node = new BinaryTreeNode(1)
      const otherNode = new BinaryTreeNode(3)
      verifyTreeNode(node, 1)
      verifyTreeNode(otherNode, 3)
      const tree = new BinaryTree(node, 2, otherNode)
      verifyTree(tree, [1, 2, 3])
      verifyTreeNode(node, 1)
      verifyTreeNode(otherNode, 3)
    })
    it('preserves left child of first node added with successive node', () => {
      const leftChild = new BinaryTreeNode(2)
      const node = new BinaryTreeNode(1, {
        left: leftChild,
      })
      const newNode = new BinaryTreeNode(3)
      verifyTreeNode(node, 1, 2, '')
      verifyTreeNode(leftChild, 2)
      verifyTreeNode(newNode, 3)
      const tree = new BinaryTree(node, newNode)
      verifyTree(tree, [1, 2, 3])
      verifyTreeNode(node, 1, 2, '')
      verifyTreeNode(leftChild, 2)
      verifyTreeNode(newNode, 3)
    })
    it('two nodes with children get merged', () => {
      const firstLeftChild = new BinaryTreeNode(2)
      const firstRightChild = new BinaryTreeNode(3)
      const firstNode = new BinaryTreeNode(1, {
        left: firstLeftChild,
        right: firstRightChild,
      })
      const secondLeftChild = new BinaryTreeNode(5)
      const secondRightChild = new BinaryTreeNode(6)
      const secondNode = new BinaryTreeNode(4, {
        left: secondLeftChild,
        right: secondRightChild,
      })
      verifyTreeNode(firstNode, 1, 2, 3)
      verifyTreeNode(firstLeftChild, 2)
      verifyTreeNode(firstRightChild, 3)
      verifyTreeNode(secondNode, 4, 5, 6)
      verifyTreeNode(secondLeftChild, 5)
      verifyTreeNode(secondRightChild, 6)
      const tree = new BinaryTree(firstNode, secondNode)
      verifyTree(tree, [1, 2, 3, 4, 5, 6, ''])
      verifyTreeNode(firstNode, 1, 2, 3)
      verifyTreeNode(firstLeftChild, 2)
      verifyTreeNode(firstRightChild, 3)
      verifyTreeNode(secondNode, 4, 5, 6)
      verifyTreeNode(secondLeftChild, 5)
      verifyTreeNode(secondRightChild, 6)
    })
  })
  describe('root', () => {
    it('returns undefined if not initialized', () => {
      expect(new BinaryTree().root).toEqual(undefined)
    })
    it('returns node if initialized without children', () => {
      expect(new BinaryTree(1).root).toEqual({
        _data: 1,
        left: undefined,
        right: undefined,
      })
    })
    it('returns node if initialized with children', () => {
      expect(new BinaryTree(1, 2, 3).root).toEqual({
        _data: 1,
        left: {
          _data: 2,
          left: undefined,
          right: undefined,
        },
        right: {
          _data: 3,
          left: undefined,
          right: undefined,
        },
      })
    })
  })
  describe('serialize', () => {
    it('returns empty string when empty', () => {
      expect(new BinaryTree().serialize()).toEqual('||')
    })
    it('returns data for single', () => {
      expect(new BinaryTree(1).serialize()).toEqual('|1|')
    })
    it('returns child on new row for double', () => {
      expect(new BinaryTree(1, 2).serialize()).toEqual('|1|\n|2<>|')
    })
    it('returns children on new row for triple', () => {
      expect(new BinaryTree(1, 2, 3).serialize()).toEqual('|1|\n|2<>3|')
    })
    it('returns children pairs separated for three level tree', () => {
      expect(new BinaryTree(1, 2, 3, 4, 5, 6, 7).serialize()).toEqual('|1|\n|2<>3|\n|4<>5|6<>7|')
    })
  })
  describe('deserialize', () => {
    it('throws error for empty string', () => {
      expect(() => BinaryTree.deserialize('')).toThrow(
        'Invalid BinaryTree serialization string for level "": Must begin with character "|".'
      )
    })
    it('throws error if beginning character omitted', () => {
      expect(() => BinaryTree.deserialize('a|')).toThrow(
        'Invalid BinaryTree serialization string for level "a|": Must begin with character "|".'
      )
    })
    it('throws error if end character omitted', () => {
      expect(() => BinaryTree.deserialize('|a')).toThrow(
        'Invalid BinaryTree serialization string for level "|a": Must end with character "|".'
      )
    })
    it('throws error for node with three children', () => {
      expect(() => BinaryTree.deserialize('|1|\n|2<>3<>4|')).toThrow(
        'Invalid number of children for pair "2<>3<>4": BinaryTreeNode can only have "2" children maximum.'
      )
    })
    it('throws error for node with incorrect pairs for first level', () => {
      expect(() => BinaryTree.deserialize('|1|\n|2<>|3<>4|')).toThrow(
        'Invalid number of pairs for level "|2<>|3<>4|": BinaryTreeNode needs to have "1" pairs at level "1".'
      )
    })
    it('throws error for node with incorrect pairs for second level', () => {
      expect(() => BinaryTree.deserialize('|1|\n|2<>3|\n|4<>5|')).toThrow(
        'Invalid number of pairs for level "|4<>5|": BinaryTreeNode needs to have "2" pairs at level "2".'
      )
    })
    it('converts to empty tree if data is empty', () => {
      verifyTree(BinaryTree.deserialize('||'), [])
    })
    it('converts single string to single node implicitly', () => {
      verifyTree(BinaryTree.deserialize('|a|'), ['a'])
    })
    it('converts single string to single node explicitly', () => {
      verifyTree(BinaryTree.deserialize('|a|', String), ['a'])
    })
    it('converts single number to single node', () => {
      verifyTree(BinaryTree.deserialize('|1|', Number), [1])
    })
    it('converts data with left child', () => {
      verifyTree(BinaryTree.deserialize('|1|\n|2<>|', Number), [1, 2, ''])
    })
    it('converts data with right child', () => {
      verifyTree(BinaryTree.deserialize('|1|\n|<>2|', Number), [1, '', 2])
    })
    it('converts data with both children', () => {
      verifyTree(BinaryTree.deserialize('|1|\n|2<>3|', Number), [1, 2, 3])
    })
    it('converts data with left grandchildren and right child', () => {
      verifyTree(BinaryTree.deserialize('|1|\n|2<>3|\n|4<>5|<>|', Number), [1, 2, 3, 4, 5, '', ''])
    })
    it('converts data with left child and right grandchildren', () => {
      verifyTree(BinaryTree.deserialize('|1|\n|2<>3|\n|<>|4<>5|', Number), [1, 2, 3, '', '', 4, 5])
    })
    it('converts data with left and right granchildren', () => {
      verifyTree(BinaryTree.deserialize('|1|\n|2<>3|\n|4<>5|6<>7|', Number), [1, 2, 3, 4, 5, 6, 7])
    })
    it('converts data with only left grandchildren', () => {
      verifyTree(BinaryTree.deserialize('|1|\n|2<>|\n|3<>4|<>|', Number), [1, 2, '', 3, 4, '', ''])
    })
    it('converts data with only right grandchildren', () => {
      verifyTree(BinaryTree.deserialize('|1|\n|<>2|\n|<>|3<>4|', Number), [1, '', 2, '', '', 3, 4])
    })
  })
  describe('add', () => {
    it('throws error if adding empty string', () => {
      expect(() => new BinaryTree().add('')).toThrow('Data for BinaryTree node cannot be empty string.')
    })
    it('can add number to empty', () => {
      const tree = new BinaryTree()
      verifyTree(tree, [])
      verifyTree(tree.add(1), [1])
      verifyTree(tree, [1])
    })
    it('can add node to empty', () => {
      const tree = new BinaryTree()
      const node = new BinaryTreeNode(1)
      verifyTree(tree, [])
      verifyTreeNode(node, 1)
      verifyTree(tree.add(node), [1])
      verifyTree(tree, [1])
      verifyTreeNode(node, 1)
    })
    it('can add number to single node', () => {
      const tree = new BinaryTree(1)
      verifyTree(tree, [1])
      verifyTree(tree.add(2), [1, 2, ''])
      verifyTree(tree, [1, 2, ''])
    })
    it('can add node to single node', () => {
      const tree = new BinaryTree(1)
      const node = new BinaryTreeNode(2)
      verifyTree(tree, [1])
      verifyTreeNode(node, 2)
      verifyTree(tree.add(node), [1, 2, ''])
      verifyTree(tree, [1, 2, ''])
      verifyTreeNode(node, 2)
    })
    it('can add number to double nodes', () => {
      const tree = new BinaryTree(1, 2)
      verifyTree(tree, [1, 2, ''])
      verifyTree(tree.add(3), [1, 2, 3])
      verifyTree(tree, [1, 2, 3])
    })
    it('can add node without children to double', () => {
      const tree = new BinaryTree(1, 2)
      const node = new BinaryTreeNode(3)
      verifyTree(tree, [1, 2, ''])
      verifyTreeNode(node, 3)
      verifyTree(tree.add(node), [1, 2, 3])
      verifyTree(tree, [1, 2, 3])
      verifyTreeNode(node, 3)
    })
    it('can add node with left child', () => {
      const child = new BinaryTreeNode(3)
      const node = new BinaryTreeNode(2, {
        left: child,
      })
      const tree = new BinaryTree(1)
      verifyTree(tree, [1])
      verifyTreeNode(node, 2, 3, '')
      verifyTreeNode(child, 3)
      verifyTree(tree.add(node), [1, 2, 3])
      verifyTree(tree, [1, 2, 3])
      verifyTreeNode(node, 2, 3, '')
      verifyTreeNode(child, 3)
    })
    it('can add node with right child', () => {
      const child = new BinaryTreeNode(3)
      const node = new BinaryTreeNode(2, {
        right: child,
      })
      const tree = new BinaryTree(1)
      verifyTree(tree, [1])
      verifyTreeNode(node, 2, '', 3)
      verifyTreeNode(child, 3)
      verifyTree(tree.add(node), [1, 2, 3])
      verifyTree(tree, [1, 2, 3])
      verifyTreeNode(node, 2, '', 3)
      verifyTreeNode(child, 3)
    })
    it('can add node with both children', () => {
      const leftChild = new BinaryTreeNode(3)
      const rightChild = new BinaryTreeNode(4)
      const node = new BinaryTreeNode(2, {
        left: leftChild,
        right: rightChild,
      })
      const tree = new BinaryTree(1)
      verifyTree(tree, [1])
      verifyTreeNode(node, 2, 3, 4)
      verifyTreeNode(leftChild, 3)
      verifyTreeNode(rightChild, 4)
      verifyTree(tree.add(node), [1, 2, 3, 4, '', '', ''])
      verifyTree(tree, [1, 2, 3, 4, '', '', ''])
      verifyTreeNode(node, 2, 3, 4)
      verifyTreeNode(leftChild, 3)
      verifyTreeNode(rightChild, 4)
    })
    it('cannot add undefined', () => {
      const tree = new BinaryTree()
      verifyTree(tree, [])
      verifyTree(tree.add(undefined), [])
      verifyTree(tree, [])
    })
  })
})

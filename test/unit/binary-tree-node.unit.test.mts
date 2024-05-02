import BinaryTreeNode, { isBinaryTreeNode } from '../../src/binary-tree-node.mjs'
import { verifyTreeNode } from './helpers.mjs'

describe('Binary Tree Node Unit Tests', () => {
  describe('constructor', () => {
    it('throws error for empty string', () => {
      expect(() => new BinaryTreeNode('')).toThrow('Data for BinaryTreeNode cannot be empty string.')
    })
    it('can create from string', () => {
      verifyTreeNode(new BinaryTreeNode('a'), 'a')
    })
    it('can create from number', () => {
      verifyTreeNode(new BinaryTreeNode(1), 1)
    })
  })
  describe('data', () => {
    it('can get string data from node', () => {
      expect(new BinaryTreeNode('1').data).toEqual('1')
    })
    it('can get number data from node', () => {
      expect(new BinaryTreeNode(1).data).toEqual(1)
    })
  })
  describe('children', () => {
    it('can set left from undefined to node', () => {
      const node = new BinaryTreeNode(1)
      verifyTreeNode(node, [1])
      node.left = new BinaryTreeNode(2)
      verifyTreeNode(node, 1, 2)
    })
    it('can set right from undefined to node', () => {
      const node = new BinaryTreeNode(1)
      verifyTreeNode(node, [1])
      node.right = new BinaryTreeNode(2)
      verifyTreeNode(node, 1, '', 2)
    })
    it('can set left and right from undefined to node', () => {
      const node = new BinaryTreeNode(1)
      verifyTreeNode(node, [1])
      node.left = new BinaryTreeNode(2)
      node.right = new BinaryTreeNode(3)
      verifyTreeNode(node, 1, 2, 3)
    })
  })
  describe('serialize', () => {
    it('returns data for node without children', () => {
      expect(new BinaryTreeNode(1).serialize()).toEqual('|1|')
    })
    it('returns data for node with data and explicitly undefined children', () => {
      expect(
        new BinaryTreeNode(1, {
          left: undefined,
          right: undefined,
        }).serialize()
      ).toEqual('|1|')
    })
    it('returns serialization for node with only left child', () => {
      expect(
        new BinaryTreeNode(1, {
          left: new BinaryTreeNode(2),
        }).serialize()
      ).toEqual('|1|\n|2<>|')
    })
    it('returns serialization for node with only left child', () => {
      expect(
        new BinaryTreeNode(1, {
          right: new BinaryTreeNode(2),
        }).serialize()
      ).toEqual('|1|\n|<>2|')
    })
    it('returns serialization for node with both left and right children', () => {
      expect(
        new BinaryTreeNode(1, {
          left: new BinaryTreeNode(2),
          right: new BinaryTreeNode(3),
        }).serialize()
      ).toEqual('|1|\n|2<>3|')
    })
    it('returns serialization for node with left grandchildren and right child', () => {
      expect(
        new BinaryTreeNode(1, {
          left: new BinaryTreeNode(2, {
            left: new BinaryTreeNode(4),
            right: new BinaryTreeNode(5),
          }),
          right: new BinaryTreeNode(3),
        }).serialize()
      ).toEqual('|1|\n|2<>3|\n|4<>5|<>|')
    })
    it('returns serialization for node with left child and right grandchildren', () => {
      expect(
        new BinaryTreeNode(1, {
          left: new BinaryTreeNode(2),
          right: new BinaryTreeNode(3, {
            left: new BinaryTreeNode(4),
            right: new BinaryTreeNode(5),
          }),
        }).serialize()
      ).toEqual('|1|\n|2<>3|\n|<>|4<>5|')
    })
    it('returns serialization for node with left and right grandchildren', () => {
      expect(
        new BinaryTreeNode(1, {
          left: new BinaryTreeNode(2, {
            left: new BinaryTreeNode(4),
            right: new BinaryTreeNode(5),
          }),
          right: new BinaryTreeNode(3, {
            left: new BinaryTreeNode(6),
            right: new BinaryTreeNode(7),
          }),
        }).serialize()
      ).toEqual('|1|\n|2<>3|\n|4<>5|6<>7|')
    })
    it('returns serialization for node with only left granchildren', () => {
      expect(
        new BinaryTreeNode(1, {
          left: new BinaryTreeNode(2, {
            left: new BinaryTreeNode(3),
          }),
        }).serialize()
      ).toEqual('|1|\n|2<>|\n|3<>|<>|')
    })
    it('returns serialization for node with only right granchildren', () => {
      expect(
        new BinaryTreeNode(1, {
          right: new BinaryTreeNode(2, {
            right: new BinaryTreeNode(3),
          }),
        }).serialize()
      ).toEqual('|1|\n|<>2|\n|<>|<>3|')
    })
  })
  describe('deserialize', () => {
    it('throws error for empty string', () => {
      expect(() => BinaryTreeNode.deserialize('')).toThrow(
        'Invalid BinaryTreeNode serialization string for level "": Must begin with character "|".'
      )
    })
    it('throws error if beginning character omitted', () => {
      expect(() => BinaryTreeNode.deserialize('a|')).toThrow(
        'Invalid BinaryTreeNode serialization string for level "a|": Must begin with character "|".'
      )
    })
    it('throws error if end character omitted', () => {
      expect(() => BinaryTreeNode.deserialize('|a')).toThrow(
        'Invalid BinaryTreeNode serialization string for level "|a": Must end with character "|".'
      )
    })
    it('throws error for node with three children', () => {
      expect(() => BinaryTreeNode.deserialize('|1|\n|2<>3<>4|')).toThrow(
        'Invalid number of children for pair "2<>3<>4": BinaryTreeNode can only have "2" children maximum.'
      )
    })
    it('throws error for node with incorrect pairs for first level', () => {
      expect(() => BinaryTreeNode.deserialize('|1|\n|2<>|3<>4|')).toThrow(
        'Invalid number of pairs for level "|2<>|3<>4|": BinaryTreeNode needs to have "1" pairs at level "1"'
      )
    })
    it('throws error for node with incorrect pairs for second level', () => {
      expect(() => BinaryTreeNode.deserialize('|1|\n|2<>3|\n|4<>5|')).toThrow(
        'Invalid number of pairs for level "|4<>5|": BinaryTreeNode needs to have "2" pairs at level "2"'
      )
    })
    it('throws error if root data empty', () => {
      expect(() => BinaryTreeNode.deserialize('||')).toThrow(
        'Invalid BinaryTreeNode serialization string "||": Must contain at least one node of data.'
      )
    })
    it('throws error if parent node empty', () => {
      expect(() => BinaryTreeNode.deserialize('|1|\n|<>2|\n|3<>4|<>|')).toThrow(
        'Invalid parent-less children "3<>4": BinaryTreeNode children must have parent with data.'
      )
    })
    it('converts single string to single node implicitly', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|a|'), 'a')
    })
    it('converts single string to single node explicitly', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|a|', String), 'a')
    })
    it('converts single number to single node', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|1|', Number), 1)
    })
    it('converts data with left child', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|1|\n|2<>|', Number), 1, 2)
    })
    it('converts data with right child', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|1|\n|<>2|', Number), 1, '', 2)
    })
    it('converts data with both children', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|1|\n|2<>3|', Number), 1, 2, 3)
    })
    it('converts data with left grandchildren and right child', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|1|\n|2<>3|\n|4<>5|<>|', Number), 1, 2, 3, 4, 5, '', '')
    })
    it('converts data with left child and right grandchildren', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|1|\n|2<>3|\n|<>|4<>5|', Number), 1, 2, 3, '', '', 4, 5)
    })
    it('converts data with left and right granchildren', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|1|\n|2<>3|\n|4<>5|6<>7|', Number), 1, 2, 3, 4, 5, 6, 7)
    })
    it('converts data with only left grandchildren', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|1|\n|2<>|\n|3<>4|<>|', Number), 1, 2, '', 3, 4, '', '')
    })
    it('converts data with only right grandchildren', () => {
      verifyTreeNode(BinaryTreeNode.deserialize('|1|\n|<>2|\n|<>|3<>4|', Number), 1, '', 2, '', '', 3, 4)
    })
  })
  describe('isBinaryTreeNode', () => {
    it('returns true for node without children', () => {
      expect(isBinaryTreeNode(new BinaryTreeNode(1))).toEqual(true)
    })
    it('returns true for node with children', () => {
      expect(
        isBinaryTreeNode(
          new BinaryTreeNode(1, {
            left: new BinaryTreeNode(2),
            right: new BinaryTreeNode(3),
          })
        )
      ).toEqual(true)
    })
    it('returns false for undefined', () => {
      expect(isBinaryTreeNode(undefined)).toEqual(false)
    })
    it('returns false for null', () => {
      expect(isBinaryTreeNode(null)).toEqual(false)
    })
    it('returns false for false', () => {
      expect(isBinaryTreeNode(false)).toEqual(false)
    })
    it('returns false for true', () => {
      expect(isBinaryTreeNode(true)).toEqual(false)
    })
    it('returns false for empty string', () => {
      expect(isBinaryTreeNode('')).toEqual(false)
    })
    it('returns false for single character string', () => {
      expect(isBinaryTreeNode('a')).toEqual(false)
    })
    it('returns false for multiple character string', () => {
      expect(isBinaryTreeNode('abc')).toEqual(false)
    })
    it('returns false for negative number', () => {
      expect(isBinaryTreeNode(-1)).toEqual(false)
    })
    it('returns false for zero', () => {
      expect(isBinaryTreeNode(0)).toEqual(false)
    })
    it('returns false for positive number', () => {
      expect(isBinaryTreeNode(1)).toEqual(false)
    })
    it('returns false for empty array', () => {
      expect(isBinaryTreeNode([])).toEqual(false)
    })
    it('returns false for single element array', () => {
      expect(isBinaryTreeNode(['a'])).toEqual(false)
    })
    it('returns false for multiple element array', () => {
      expect(isBinaryTreeNode(['a', 'b'])).toEqual(false)
    })
    it('returns false for object with just next', () => {
      expect(
        isBinaryTreeNode({
          next: undefined,
        })
      ).toEqual(false)
    })
    it('returns false for object with just serialize', () => {
      expect(
        isBinaryTreeNode({
          serialize: () => '',
        })
      ).toEqual(false)
    })
    it('returns false for object with _data next and another property', () => {
      expect(
        isBinaryTreeNode({
          _data: 1,
          next: undefined,
          foo: 'bar',
        })
      ).toEqual(false)
    })
  })
})

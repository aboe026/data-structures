import LinkedList from '../../src/linked-list'
import LinkedListNode from '../../src/linked-list-node'
import Queue from '../../src/queue'
import Stack from '../../src/stack'

export function verifyNode(actual: LinkedListNode, data: any, next?: any[]) {
  const expected: any[] = []
  if (data) {
    expected.push(data)
  }
  if (next) {
    expected.push(...next)
  }

  expect(actual.serialize()).toEqual(serializeExpectedNodes(expected))
}

export function verifyList(actual: LinkedList, expected: any[]) {
  expect(actual.serialize()).toEqual(serializeExpectedNodes(expected))
}

export function verifyStack(actual: Stack, expected: any[]) {
  expect(actual.serialize()).toEqual(serializeExpectedNodes(expected))
}

export function verifyQueue(actul: Queue, expected: any[]) {
  expect(actul.serialize()).toEqual(serializeExpectedNodes(expected))
}

export function serializeExpectedNodes(data?: any[]) {
  let expected = ''
  if (data) {
    for (let i = 0; i < data.length; i++) {
      expected += `${data[i]}${i === data.length - 1 ? '' : ' -> '}`
    }
  }
  return expected
}

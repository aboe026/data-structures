export function binarySearchIterative(items: number[], target: number) {
  let left = 0
  let right = items.length - 1
  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2)
    if (items[middle] === target) {
      return middle
    } else if (items[middle] > target) {
      right = middle - 1
    } else {
      left = middle + 1
    }
  }
}

export function binarySearchRecursive(
  items: number[],
  target: number,
  left?: number,
  right?: number
): number | undefined {
  left = left === undefined ? 0 : left
  right = right === undefined ? items.length - 1 : right
  if (left > right) {
    return undefined
  }
  const middle = left + Math.floor((right - left) / 2)
  if (items[middle] === target) {
    return middle
  } else if (items[middle] > target) {
    return binarySearchRecursive(items, target, left, middle - 1)
  } else {
    return binarySearchRecursive(items, target, middle + 1, right)
  }
}

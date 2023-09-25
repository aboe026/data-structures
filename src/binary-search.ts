export function binarySearchIterative(sortedItems: number[], target: number): number | undefined {
  let left = 0
  let right = sortedItems.length - 1
  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2)
    const current = sortedItems[middle]
    if (current === target) {
      return middle
    } else if (current < target) {
      left = middle + 1
    } else {
      right = middle - 1
    }
  }
}

export function binarySearchRecursive(
  sortedItems: number[],
  target: number,
  left?: number,
  right?: number
): number | undefined {
  left = left === undefined ? 0 : left
  right = right === undefined ? sortedItems.length - 1 : right
  if (left <= right) {
    const middle = left + Math.floor((right - left) / 2)
    const current = sortedItems[middle]
    if (current === target) {
      return middle
    } else if (current < target) {
      return binarySearchRecursive(sortedItems, target, middle + 1, right)
    } else {
      return binarySearchRecursive(sortedItems, target, left, middle - 1)
    }
  }
}

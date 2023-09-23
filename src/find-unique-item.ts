export default function findUniqueItem(first: number[], second: number[]): number | undefined {
  for (const firstItem of first) {
    let exists = false
    for (const secondItem of second) {
      if (firstItem === secondItem) {
        exists = true
      }
    }
    if (!exists) {
      return firstItem
    }
  }
  for (const secondItem of second) {
    let exists = false
    for (const firstItem of first) {
      if (secondItem === firstItem) {
        exists = true
      }
    }
    if (!exists) {
      return secondItem
    }
  }
}

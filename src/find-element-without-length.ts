export default function findElementWithoutLength(items: number[], target: number): number | undefined {
  let index = 0
  while (items[index] !== undefined) {
    if (items[index] === target) {
      return index
    }
    index++
  }
}

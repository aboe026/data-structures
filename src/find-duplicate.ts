export default function findDuplicate(items: number[]): number | undefined {
  for (let i = 0; i < items.length; i = i + 2) {
    if (items[i] !== items[i + 1]) {
      return items[i]
    }
  }
}

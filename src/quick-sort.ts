import Queue from './queue'

export default function quickSort(unsorted: Queue<number>): Queue<number> {
  if (!unsorted.peek()) {
    return new Queue<number>()
  }

  const less = new Queue<number>()
  const same = new Queue<number>()
  const more = new Queue<number>()

  const pivot = unsorted.dequeue()
  if (pivot) {
    same.enqueue(pivot)
    while (unsorted.peek()) {
      const item = unsorted.dequeue()
      if (item) {
        if (item < pivot) {
          less.enqueue(item)
        } else if (item === pivot) {
          same.enqueue(item)
        } else {
          more.enqueue(item)
        }
      }
    }
  }

  const sortedLess = quickSort(less)
  const sortedMore = quickSort(more)

  const sorted = new Queue<number>()

  while (sortedLess.peek()) {
    const item = sortedLess.dequeue()
    if (item) {
      sorted.enqueue(item)
    }
  }
  while (same.peek()) {
    const item = same.dequeue()
    if (item) {
      sorted.enqueue(item)
    }
  }
  while (sortedMore.peek()) {
    const item = sortedMore.dequeue()
    if (item) {
      sorted.enqueue(item)
    }
  }

  return sorted
}

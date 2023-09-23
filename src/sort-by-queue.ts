import Queue from './queue'
import quickSort from './quick-sort'

export default function sortByQueue(unordered: number[]): number[] {
  const queue = new Queue<number>()
  for (const item of unordered) {
    queue.enqueue(item)
  }

  const sortedQueue = quickSort(queue)

  const sortedArray: number[] = []
  while (sortedQueue.peek()) {
    const item = sortedQueue.dequeue()
    if (item) {
      sortedArray.push(item)
    }
  }

  return sortedArray
}

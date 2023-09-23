import quickSort from '../../src/quick-sort'
import Queue from '../../src/queue'

describe('quick-sort', () => {
  it('returns empty queue if given empty queue', () => {
    expect(quickSort(new Queue<number>()).serialize()).toEqual('||')
  })
  it('returns single element queue if given single element queue', () => {
    expect(quickSort(new Queue<number>(1)).serialize()).toEqual('|1|')
  })
  it('returns sorted double element queue if given sorted double element queue', () => {
    expect(quickSort(new Queue<number>(1, 2)).serialize()).toEqual('|1->2|')
  })
  it('returns sorted double element queue if given unsorted double element queue', () => {
    expect(quickSort(new Queue<number>(2, 1)).serialize()).toEqual('|1->2|')
  })
  it('returns duplicate double element queue if given duplicate double element queue', () => {
    expect(quickSort(new Queue<number>(1, 1)).serialize()).toEqual('|1->1|')
  })
  it('returns sorted triple element queue if given sorted triple element queue', () => {
    expect(quickSort(new Queue<number>(1, 2, 3)).serialize()).toEqual('|1->2->3|')
  })
  it('returns sorted triple element queue if given unsorted triple element queue', () => {
    expect(quickSort(new Queue<number>(3, 2, 1)).serialize()).toEqual('|1->2->3|')
  })
  it('returns duplicate triple element queue if given duplicate triple element queue', () => {
    expect(quickSort(new Queue<number>(1, 1, 1)).serialize()).toEqual('|1->1->1|')
  })
  it('returns sorted triple element queue if given triple element queue with front duplicates', () => {
    expect(quickSort(new Queue<number>(2, 2, 1)).serialize()).toEqual('|1->2->2|')
  })
  it('returns sorted triple element queue if given triple element queue with end duplicates', () => {
    expect(quickSort(new Queue<number>(2, 1, 1)).serialize()).toEqual('|1->1->2|')
  })
})

const test = require('tape')

// -----------------------------------------------------------------------------
// QUICK SORT
// -----------------------------------------------------------------------------

// partition : Array<number> * int * int -> Array<number>
// Partitions arr[p..r] using arr[r] as pivot.
// The array arr[p..r] consists of four subarrays L, R, U, and P.
//   - Left:    elements that comes before the pivot;  arr[p..q-1]
//   - Right:   elements that comes sfter the pivot;   arr[q..u-1]
//   - Unknown: elements that are not yet examined;    arr[u..r-1]
//   - Pivot:   the pivot;                             arr[r]
//   - q is the starting index of Right subarray.
//   - u is the starting index of Unknown subarray.
const partition = (arr, p, r) => {
  // pivot : number
  const pivot = arr[r]

  // q : int
  let q = p

  for (let u = p; u < r; u++) {
    if (arr[u] <= pivot) {
      [ arr[q], arr[u] ] = [ arr[u], arr[q] ]
      q++
    }
  }

  arr[r] = arr[q]
  arr[q] = pivot

  return q
}

test('partition', t => {
  const arr = [ 12, 7, 14, 9, 10, 11 ]
  const q = partition(arr, 0, arr.length - 1)
  t.equal(q, 3)
  t.deepEqual(arr, [7, 9, 10, 11, 14, 12])

  t.end()
})

// sort : Array<number> * int * int -> Array<number>
// Given an array of numbers and indices of start and end positions,
// quick-sorts in ascending order.
const sort = (arr, p, r) => {
  if (p >= r)
    return arr

  // Choose pivot randomly:
  const i = Math.floor(Math.random() * (r - p + 1) + p)
  const temp = arr[r]
  arr[r] = arr[i]
  arr[i] = temp

  const q = partition(arr, p, r)

  sort(arr, p, q - 1)
  sort(arr, q + 1, r)
}

test('quick-sort', t => {
  const a = [ 1 ]
  sort(a, 0, a.length - 1)
  t.deepEqual(a, [ 1 ])

  const b = [ 12, 7, 14, 9, 10, 11 ]
  sort(b, 0, b.length - 1)
  t.deepEqual(b, [7, 9, 10, 11, 12, 14])

  t.end()
})

const test = require('tape')

// -----------------------------------------------------------------------------
// COUNTING SORT

// A = [ 4 1 5 0 1 6 5 1 5 3 ]  -->  input
// B = [ 0 1 1 1 3 4 5 5 5 6 ]  --> output
//
//           0 1 2 3 4 5 6
// equal = [ 1 3 0 1 1 3 1 ]  --> equal[i] is the number of elements of A
//                                that equal to i.
//
//           0 1 2 3 4 5 6
// less  = [ 0 1 4 4 5 6 9 ]  --> less[i] is the number of elements of A
//               *               that are less than i.
//               |
//               |               e.g. Since less[2] is 4, there are 4 elements
//               |                    that are less than 2. That is, the next 2
//               |                    will be placed at 5th position, which is
//               |                    right after those 4 elements,
//               *
// next  = [ 1 2 5 5 6 7 10 ]  --> next[i] is the index that the next i will be
//           0 1 2 3 4 5 6         placed.
//                                 next = [ x + 1 | x <- less ]
//
// -----------------------------------------------------------------------------

// countKeysEqual : Array<int> * int * int -> Array<int>
// Given an array of integers[0, m-1], the length of A, and a number that
// defines the range of the values in A, produces an array equal[0, m-1]
// such that equal[i] is the number of elements of A that equal to i.
const countKeysEqual = (A, n, m) => {
  // equal : Array<int>
  const equal = []

  for (let i = 0; i < m; i++) {
    equal[i] = 0
  }

  A.forEach(x => {
    equal[x]++
  })

  return equal
}

test('countKeysEqual', t => {
  t.deepEqual( countKeysEqual([ 4, 1, 5, 0, 1, 6, 5, 1, 5, 3 ], 10, 7)
             , [ 1, 3, 0, 1, 1, 3, 1 ]
             )

  t.end()
})

// countKeysLess : Array<int> * int -> Array<int>
const countKeysLess = (equal, m) => {
  // less : Array<int>
  const less = []

  less[0] = 0

  for (let j = 1; j < m; j++) {
    less[j] = less[j-1] + equal[j-1]
  }

  return less
}

test('countKeysLess', t => {
  t.deepEqual( countKeysLess([ 1, 3, 0, 1, 1, 3, 1 ], 7)
             , [ 0, 1, 4, 4, 5, 6, 9 ]
             )
  t.end()
})

// rearrange : Array<int> * Array<int> * int * int -> Array<int>
const rearrange = (A, less, n, m) => {
  // B : Array<int>
  const B = []
  // next : Array<int>
  const next = less
  // const next = less.map(x => x + 1)

  A.forEach(x => {
    B[next[x]] = x
    next[x]++
  })

  return B
}

test('rearrange', t => {
  const arr = [ 4, 1, 5, 0, 1, 6, 5, 1, 5, 3 ]
  const m = 7
  const equal = countKeysEqual(arr, arr.length, m)
  const less = countKeysLess(equal, m)

  t.deepEqual( rearrange(arr, less, arr.length, m)
             , arr.sort()
             )

  t.end()
})

// countingSort : Array<int> * int * int => Array<int>
// Given an array of integers[0, m), its length, and a number that defines
// the range of the values in A.
const countingSort = (A, n, m) => {
  const equal = countKeysEqual(A, n, m)
  const less  = countKeysLess(equal, m)

  return rearrange(A, less, n, m)
}

test('countingSort', t => {
  t.plan(3)

  const arr0 = []
  const m0   = 0
  t.deepEqual( countingSort(arr0, arr0.length, m0)
             , arr0.sort()
             )

  const arr1 = [ 0 ]
  const m1   = 1
  t.deepEqual( countingSort(arr1, arr1.length, m1)
             , arr1.sort()
             )

  const arr2 = [ 4, 1, 5, 0, 1, 6, 5, 1, 5, 3 ]
  const m2   = 7
  t.deepEqual( countingSort(arr2, arr2.length, m2)
             , arr2.sort()
             )
})

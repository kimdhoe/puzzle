const test = require('tape')

// -----------------------------------------------------------------------------
//  Merge-Sort (Functional)
// -----------------------------------------------------------------------------

// Array<number> * Array<number> -> Array<number>
// Merges sorted arrays xs and ys.
const merge = (xs, ys) =>
  xs.length === 0 ? ys                                   :
  ys.length === 0 ? xs                                   :
  xs[0] < ys[0]   ? [ xs[0], ...merge(xs.slice(1), ys) ] :
                    [ ys[0], ...merge(xs, ys.slice(1)) ]

test('merge', t => {
  t.plan(3)
  t.deepEqual(merge([], [1]), [1])
  t.deepEqual(merge([1], []), [1])
  t.deepEqual(merge([1, 3, 5], [2, 4, 6]), [1, 2, 3, 4, 5, 6])
})

// Array<number> -> Array<number>
// Merge-sorts xs.
const mergeSort = xs => {
  if (xs.length <= 1)
    return xs

  const k = Math.floor(xs.length / 2)

  return merge( mergeSort(xs.slice(0, k))
              , mergeSort(xs.slice(k))
              )
}

test('mergeSort', t => {
  t.plan(3)
  t.deepEqual( mergeSort([]),    [] )
  t.deepEqual( mergeSort([ 1 ]), [ 1 ] )
  t.deepEqual( mergeSort([ 13, 6, 3, 26, 18, 32, 9 ])
             , [ 3, 6, 9, 13, 18, 26, 32 ]
             )
})

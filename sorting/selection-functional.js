const test = require('tape')

// -----------------------------------------------------------------------------
// Selection-Sort (Functional)
// -----------------------------------------------------------------------------

// selectSmallest : Array<number> -> int
// Finds index of the smallest number in ns.
const selectSmallest = ns => {
  const go = (i, a) =>
    i >= ns.length ? a          :
    ns[i] < ns[a]  ? go(i+1, i) :
                     go(i+1, a)

  return go(1, 0)
}

test('selectSmallest', t => {
  t.equal(selectSmallest([ 5 ]), 0)
  t.equal(selectSmallest([ 5, 6, 3, 5, 1, 9 ]), 4)
  t.end()
})

// sort : Array<number> -> Array<number>
// Given an array of numbers, selection-sorts in ascending order.
const sort = ns => {
  if (ns.length <= 1)
    return ns

  const i = selectSmallest(ns)

  return [ ns[i]
         , ...sort([ ...ns.slice(0, i)
                   , ...ns.slice(i+1)
                   ]
                  )
         ]
}

test('selection-sort', t => {
  t.deepEqual( sort([])
             , []
             )
  t.deepEqual( sort([ 5 ])
             , [ 5 ]
             )
  t.deepEqual( sort([ 5, 6, 3, 5, 1, 9 ])
             , [ 1, 3, 5, 5, 6, 9 ]
             )
  t.end()
})


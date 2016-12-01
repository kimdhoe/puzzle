// -----------------------------------------------------------------------------
//  Merge-Sort (Functional)
// -----------------------------------------------------------------------------

// Array<x> * Array<x> -> Array<x>
// Merges sorted arrays xs and ys.
const merge = (xs, ys) =>
  xs.length === 0 ? ys                          :
  ys.length === 0 ? xs                          :
  xs[0] < ys[0]   ? [ xs[0]
                    , ...merge(xs.slice(1), ys)
                    ]                           :
  /* else */        [ ys[0]
                    , ...merge(xs, ys.slice(1))
                    ]

// Array<x> -> Array<x>
// Merge-sorts xs.
const sort = xs => {
  if (xs.length <= 1)
    return xs

  const k = Math.floor(xs.length / 2)

  return merge( sort(xs.slice(0, k))
              , sort(xs.slice(k))
              )
}

const r = sort([ 13,6,3,26,18,32,9 ])

console.log(r)

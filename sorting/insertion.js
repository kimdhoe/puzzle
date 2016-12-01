//  Insertion Sort

// ----------------
//  Mutating
// ----------------

const sort1 = xs => {
  for (let i = 1; i < xs.length; i++) {
    const x = xs[i]

    let j = i - 1

    while (j >= 0 && xs[j] > x) {
      xs[j + 1] = xs[j]
      j--
    }

    xs[j + 1] = x
  }
}


// ----------------
//  Functional
// ----------------

const insert = (x, xs) => {
  if (xs.length === 0)
    return [ x ]

  const [ y, ...ys ] = xs

  if (x <= y)
    return [ x, ...xs ]

  return [ y, ...insert(x, ys) ]
}

const sort2 = xs => {
  if (xs.length === 0)
    return []

  const [y, ...ys] = xs

  return insert(y, sort2(ys))
}

const xs = [ 4, 2, 1, 3, 5 ]

sort1(xs)

console.log(xs)

const ys = [ 4, 2, 1, 3, 5 ]

console.log(sort2(xs))

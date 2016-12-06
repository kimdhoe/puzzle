const test = require('tape')

// -----------------------------------------------------------------------------
// Longest Common Subsequence
//
//   Given two strings, find the longest common subsequence.
// -----------------------------------------------------------------------------

// An LCSTable is an Array<Array<int>>.
// interp. The table stores the lengths of the longest common subsequences of
// all prefixes of two strings.
// e.g.
//        |  j  0 1 2 3 4 5 6 7 8 9
//        | yj    G T A C C G T C A
//   -----+------------------------------
//   i xi |
//   0    |     0 0 0 0 0 0 0 0 0 0
//   1  C |     0 0 0 0 1 1 1 1 1 1
//   2  A |     0 0 0 1 1 1 1 1 1 2
//   3  T |     0 0 1 1 1 1 1 2 2 2
//   4  C |     0 0 1 1 2 2 2 2 3 3
//   5  G |     0 1 1 1 2 2 3 3 3 3
//   6  A |     0 1 1 2 2 2 3 3 3 4

// computeLCSTable : string * string -> LCSTable
// Given two strings, produces an LCS-table.
const computeLCSTable = (x, y) => {
  const l = []

  const m = x.length
  const n = y.length

  for (let i = 0; i <= m; i++) {
    l[i] = []
    l[i][0] = 0
  }

  for (let j = 0; j <= n; j++) {
    l[0][j] = 0
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (x[i-1] === y[j-1]) {
        l[i][j] = l[i-1][j-1] + 1
      }
      else {
        l[i][j] = Math.max( l[i][j-1]
                          , l[i-1][j]
                          )
      }
    }
  }

  return l
}

test('computeLCSTable', t => {
  const x = 'CATCGA'
  const y = 'GTACCGTCA'

  const actual   = computeLCSTable(x, y)
  const expected = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ]
                   , [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1  ]
                   , [ 0, 0, 0, 1, 1, 1, 1, 1, 1, 2  ]
                   , [ 0, 0, 1, 1, 1, 1, 1, 2, 2, 2  ]
                   , [ 0, 0, 1, 1, 2, 2, 2, 2, 3, 3  ]
                   , [ 0, 1, 1, 1, 2, 2, 3, 3, 3, 3  ]
                   , [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4  ]
                   ]

  t.deepEqual(actual, expected)

  t.end()
})

// assembleLCS : string * string * LCSTable * int * int -> string
// Produces the longest common subsequence of x and y.
//   - l is an LCS-table.
//   - i and j are the lengths of x and y respectively.
const assembleLCS = (x, y, l, i, j) => {
  if (l[i][j] === 0)
    return ''

  if (x[i-1] === y[j-1])
    return assembleLCS(x, y, l, i-1, j-1) + x[i-1]

  if (l[i][j-1] > l[i-1][j])
    return assembleLCS(x, y, l, i, j-1)

  return assembleLCS(x, y, l, i-1, j)
}

test('assembleLCS', t => {
  const x = 'CATCGA'
  const y = 'GTACCGTCA'
  const l = computeLCSTable(x, y)

  t.equal( assembleLCS(x, y, l, x.length, y.length)
         , 'CTCA'
         )

  t.end()
})

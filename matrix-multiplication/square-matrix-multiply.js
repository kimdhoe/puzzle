const test = require('tape')

// -----------------------------------------------------------------------------
// MATRIX MULTIPLICATION
// -----------------------------------------------------------------------------

// A Matrix is an Array<Row>.
// A Row is an Array<number>.

// Matrix * Matrix -> Matrix
// Given two n * n matrices, produces their n * n product.
const squareMatrixMultiply = (a, b) => {
  const n = a.length

  const result = []

  for (let i = 0; i < n; i++) {
    result.push([])

    for (let j = 0; j < n; j++) {
      result[i][j] = 0

      for (let k = 0; k < n; k++) {
        result[i][j] += a[i][k] * b[k][j]
      }
    }
  }

  return result
}

test('squareMatrixMultiply', t => {
  t.deepEqual(
    squareMatrixMultiply( [ [ 1, 2 ]
                          , [ 3, 4 ]
                          ]
                        , [ [ 1, 2 ]
                          , [ 3, 4 ]
                          ]
                        )
  , [ [  7, 10 ]
    , [ 15, 22 ]
    ]
  )
  t.end()
})

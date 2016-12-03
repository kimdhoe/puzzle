const test = require('tape')

// -----------------------------------------------------------------------------
// SELECTION-SORT
// -----------------------------------------------------------------------------

// sort : Array<number> * number -> Array<number>
// Given an array of numbers and its length, sorts the array in ascending order.
const sort = (arr, n) => {
  // temp : number
  let temp

  for (let i = 0; i < n - 1; i++) {
    let smallest = i

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[smallest]) {
        smallest = j
      }
    }

    temp = arr[i]
    arr[i] = arr[smallest]
    arr[smallest] = temp
  }
}

test('selection-sort', t => {
  const arr0 = []
  const arr1 = [ 1 ]
  const arr2 = [ 8, 4, 2, 7, 4, 21, 1 ]

  sort(arr0)
  t.deepEqual(arr0, [])

  sort(arr1)
  t.deepEqual(arr1, [ 1 ])

  sort(arr2, arr2.length)
  t.deepEqual(arr2, [ 1, 2, 4, 4, 7, 8, 21 ])

  t.end()
})

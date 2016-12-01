const test = require('tape')

// -----------------------------------------------------------------------------
// MAXIMUM SUBARRAY
//
//   Given an array of numbers, find the nonempty, contiguous subarray whose
//   values have the largest sum.
// -----------------------------------------------------------------------------

// If you halve a given array, a maximum subarray lies either:
//   - in the left half
//   - in the right half
//   - across the midpoint

// A Result is a tuple: [ number, number, number ].
//   - The first and second numbers are start index and end index respectively.
//   - The third number is sum of the elements in range.

// maxCrossingSubarray : Array<number> * number * number * number -> Result
// Given an array of numbers, start index, midpoint index, and end index,
// produce an information of crossing subarray.
const maxCrossingSubarray = (ns, low, mid, high) => {
  // len : number
  const len = ns.length

  // sum : number
  let sum = 0
  // leftSum : number
  let leftSum = -Infinity
  // rightSum : number
  let rightSum = -Infinity
  // maxLeft : number
  let maxLeft
  // maxLeft : number
  let maxRight

  for (let i = mid; i >= low; i--) {
    sum += ns[i]

    if (sum > leftSum) {
      leftSum = sum
      maxLeft = i
    }
  }

  sum = 0

  for (let i = mid + 1; i <= high; i++) {
    sum += ns[i]

    if (sum > rightSum) {
      rightSum = sum
      maxRight = i
    }
  }

  return [ maxLeft, maxRight, leftSum + rightSum ]
}

// maximumSubarray : Array<number> * number * number -> Result
// Given an array of numbers, start index, and end index, produces
// an information of maximum subarray.
const maximumSubarray = (xs, low, high) => {
  if (low === high)
    return [ low, high, xs[low] ]

  const mid = Math.floor((low + high) / 2)

  const [ leftLow, leftHigh, leftSum ]    = maximumSubarray(xs, low, mid)
  const [ rightLow, rightHigh, rightSum ] = maximumSubarray(xs, mid + 1, high)
  const [ crossLow, crossHigh, crossSum ] = maxCrossingSubarray(xs, low, mid, high)

  if ((leftSum >= rightSum) && (leftSum >= crossSum))
    return [ leftLow, leftHigh, leftSum ]

  if ((rightSum >= leftSum) && (rightSum >= crossSum))
    return [ rightLow, rightHigh, rightSum ]

  return [ crossLow, crossHigh, crossSum ]
}

test('maximumSubarray', t => {
  const arr =
    [ 13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7 ]
    //                               |------------|
    //                              maximum subarray

  t.deepEqual( maximumSubarray(arr, 0, arr.length - 1)
             , [7, 10, 43]
             )
  t.end()
})

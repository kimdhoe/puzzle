// Merges sorted subarrays A[p..q] and A[q+1..r].
const merge = (A, p, q, r) => {
  const n1 = q - p + 1
  const n2 = r - q

  const L = A.slice(p, q + 1)
  const R = A.slice(q + 1)

  L.push(Infinity)
  R.push(Infinity)

  let i = 0
  let j = 0

  for (let k = p; k <= r; k++) {
    if (L[i] <= R[j]) {
      A[k] = L[i]
      i++
    }
    else {
      A[k] = R[j]
      j++
    }
  } 
}

const mergeSort = (A, p, r) => {
  if (p < r) {
    const q = Math.floor((p + r) / 2)

    mergeSort(A, p, q)
    mergeSort(A, q + 1, r)
    merge(A, p, q, r)
  }
}

const arr = [ 5,2,4,9,5,7,11,3,3,6 ]
mergeSort(arr, 0, 9)
console.log(arr)

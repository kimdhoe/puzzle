// -----------------------------------------------------------------------------
//  TOWER OF HANOI (non-recursive version)
// -----------------------------------------------------------------------------

// A Peg is an object: { address: Address
//                     , disks:   Array<Disk>
//                     }
//   - The fist disk in disks is the one at the top.
//   - The last disk in disks is the one at the bottom.
//
// An Address is one of:
//   - 'LEFT'
//   - 'MIDDLE'
//   - 'RIGHT'
//
// A Disk is a natural number.
//   interp. Represents the size of a disk.
//     - 1 is the smallest disk.
//
// A Move is a tuple: [ Address, Address ]
//   interp. Move the top disk at the first address to the top of the second
//           address.
//   e.g. [ 'LEFT', 'MIDDLE' ]

// Int -> Array<Move>
// Given the number of disks, produces required moves to move all disks from
// the left peg to the middle peg (right peg is a spare peg).
const hanoi = n => {
  // Array<Move>
  // state
  const results = []

  const a = { address: 'LEFT',   disks: [] }
  const b = { address: 'MIDDLE', disks: [] }
  const c = { address: 'RIGHT',  disks: [] }

  for (let i = 1; i <= n; i++) {
    a.disks.push(i)
  }

  // Peg * Peg -> void
  // effect: Pushes a valid move between a and b into results.
  //   - Placing a larger disk onto a smaller one is invalid.
  const move = (a, b) => {
    if (b.disks.length === 0 || (a.disks[0] < b.disks[0])) {
      results.push([ a.address, b.address ])
      b.disks.unshift(a.disks.shift())
    }
    else if (a.disks.length === 0 || (a.disks[0] > b.disks[0])) {
      results.push([ b.address, a.address ])
      a.disks.unshift(b.disks.shift())
    }
  }

  // Peg * Peg * Peg -> void
  // effect: Populates results depending on the indices of moves.
  const go = (a, b, c) => {
    const numberOfMoves = Math.pow(2, n) - 1

    for (let i = 0; i < numberOfMoves; i++) {
      const m = i % 3

      if      (m === 0) move(a, b)
      else if (m === 1) move(a, c)
      else if (m === 2) move(b, c)
    }
  }

  if (n % 2 === 0)
    go(a, c, b)
  else
    go(a, b, c)

  return results
}




const moves3 = hanoi(3)
const moves4 = hanoi(4)
console.log(moves3)
console.log(moves4)

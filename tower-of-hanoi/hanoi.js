// -----------------------------------------------------------------------------
//  TOWER OF HANOI
// -----------------------------------------------------------------------------

// A Peg is one of:
//   - 'LEFT'
//   - 'MIDDLE'
//   - 'RIGHT'
//
// A Move is a tuple: [ Peg, Peg ]
//   interp. Move the top disk of the first peg to the top of the second peg.
//   e.g. [ 'LEFT', 'MIDDLE' ]

// number * Peg * Peg * Peg -> Array<Move>
// Produces the moves required to move n disks from peg a to peg b.
// n: number of disks
// a: starting peg
// b: target peg
// c: spare peg
const hanoi = (n, a, b, c) =>
  n === 0 ? []
          : [ ...hanoi( n-1, a, c, b )
            , [ a, b ]
            , ...hanoi( n-1, c, b, a )
            ]

const result = hanoi(3, 'LEFT', 'MIDDLE', 'RIGHT')

console.log(result)
// [ [ 'LEFT',   'MIDDLE' ]
// , [ 'LEFT',   'RIGHT'  ]
// , [ 'MIDDLE', 'RIGHT'  ]
// , [ 'LEFT',   'MIDDLE' ]
// , [ 'RIGHT',  'LEFT'   ]
// , [ 'RIGHT',  'MIDDLE' ]
// , [ 'LEFT',   'MIDDLE' ]
// ]

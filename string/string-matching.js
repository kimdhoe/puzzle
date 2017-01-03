const test = require('tape')

// -----------------------------------------------------------------------------
// Finite Automaton String Matching
// -----------------------------------------------------------------------------

// nextState[k, a]
// k is a state number running from 0 to m.
// a is any character that might appear in the text.

// A NextStateTable is an Array<Object>.
// e.g.  [ { A: 1, C: 0, G: 0, T: 0 }
//       , { A: 2, C: 0, G: 0, T: 0 }
//       , { A: 2, C: 3, G: 0, T: 0 }
//       , { A: 1, C: 0, G: 0, T: 0 }
//       ]

// A State is an integer[0,).
// interp. 0 is an initial state.

//       |  character
// state |  A  C  G  T
// ------+------------
//   0   |  1  0  0  0
//   1   |  2  0  0  0
//   2   |  2  3  0  0
//   3   |  1  0  0  0


// isSuffix : string * string -> boolean
// Is x a suffix of y?
const isSuffix = (x, y) =>
  x === y.slice(y.length - x.length)


// nextState : string * string * int * int -> NextStateTable
const nextState = (text, pattern, n, m) => {
  // table : NextStateTable
  // state
  const table = []

  for (let k = 0; k <= m; k++) {
    table.push({})

    for (let a of "ACGT") {
      const pka = pattern.slice(0, k) + a
      let i = Math.min(k + 1, m)

      while (!isSuffix(pattern.slice(0, i), pka)) {
        i--
      }

      table[k][a] = i
    }
  }

  return table
}

// FAStringMatcher : string * Table * int * int -> Array<int>
// Given a string, the table of state transition, the length of the pattern,
// and the length of the text, produces an array of all the shift amounts for
// which the pattern occurs in the text.
const FAStringMatcher = (text, nextState, m, n) => {
  // shifts : Array<int>
  // state: The shift amounts found.
  const shifts = []
  // state : State
  // state
  let state = 0

  // The shift amounts of found matches in text[0, i] will be tracked by shifts
  // array above.
  for (let i = 0; i < n; i++) {
    state = nextState[state][text[i]]

    if (state === m)
      shifts.push(i - m + 1)
  }

  return shifts
}

test('string matching', t => {
  const text    = 'GTAACAGTAAACG'
  const pattern = 'AAC'

  const table = nextState(text, pattern, text.length, pattern.length)

  t.deepEqual( table
             , [ { A: 1, C: 0, G: 0, T: 0 }
               , { A: 2, C: 0, G: 0, T: 0 }
               , { A: 2, C: 3, G: 0, T: 0 }
               , { A: 1, C: 0, G: 0, T: 0 }
               ]
             )

  const shifts = FAStringMatcher(text, table, pattern.length, text.length)

  t.deepEqual(shifts, [2, 9])

  t.end()
})

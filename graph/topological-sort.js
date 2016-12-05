const test = require('tape')

// -----------------------------------------------------------------------------
// Directed Acyclic Graphs
//   - adjacency-list representation
//
// A Graph is a Array<Array<Vertex>>.
// A Vertex is an integer.
//
// e.g.  0:  [ [  2     ]    -> Vertex 2 is adjacent to vertex 0.
//       1:  , [  3     ]
//       2:  , [  3,  4 ]    -> Vertex 3 and 4 are adjacent to vertex 2.
//       3:  , [  5     ]
//       4:  , [  5     ]
//       5:  , [  6, 10 ]
//       6:  , [  7     ]
//       7:  , [ 12     ]
//       8:  , [  9     ]
//       9:  , [ 10     ]
//      10:  , [ 11     ]
//      11:  , [ 12     ]
//      12:  , [ 13     ]
//      13:  , [        ]
//           ]
// -----------------------------------------------------------------------------

// topologicalSort : Graph -> Array<Vertex>
// Given a graph, produces a linear order of the vertices.
const topologicalSort = G => {
  // inDegrees : Array<int>
  // state: Keeps track of in-degrees of vertices corresponding to indices.
  const inDegrees = []
  // linearOrderOfVertices : Array<Vertex>
  // state: Represents the vertices whose in-degree has reached zero.
  const linearOrderOfVertices = []

  G.forEach((_, i) => {
    inDegrees[i] = 0
  })

  G.forEach(adjacentVertices => {
    adjacentVertices.forEach(x => {
      inDegrees[x]++
    })
  })

  // next : Array<Vertex>
  // state: Vertices with zero in-degree.
  const next = []

  inDegrees.forEach((inDegree, i) => {
    if (inDegree === 0)
      next.push(i)
  })

  while (next.length) {
    const u = next.pop()

    linearOrderOfVertices.push(u)

    G[u].forEach(v => {
      inDegrees[v]--

      if (inDegrees[v] === 0)
        next.push(v)
    })
  }

  return linearOrderOfVertices
}

test('topologicalSort', t => {
  const g = [ [  2     ]    //      0
            , [  3     ]    //      |
            , [  3,  4 ]    //  1   2     8
            , [  5     ]    //   \ / \    |
            , [  5     ]    //    3   4   9
            , [  6, 10 ]    //     \ /    |
            , [  7     ]    //      5     |
            , [ 12     ]    //      | \   |
            , [  9     ]    //      6  \  |
            , [ 10     ]    //      |    10
            , [ 11     ]    //      7     |
            , [ 12     ]    //        \  11
            , [ 13     ]    //         \  |
            , [        ]    //           12
            ]               //            |
                            //           13

  const result = topologicalSort(g)

  t.ok( result.indexOf( 2) > result.indexOf( 0) )
  t.ok( result.indexOf( 3) > result.indexOf( 1) )
  t.ok( result.indexOf( 3) > result.indexOf( 2) )
  t.ok( result.indexOf( 4) > result.indexOf( 2) )
  t.ok( result.indexOf( 5) > result.indexOf( 3) )
  t.ok( result.indexOf( 5) > result.indexOf( 4) )
  t.ok( result.indexOf( 6) > result.indexOf( 5) )
  t.ok( result.indexOf( 7) > result.indexOf( 6) )
  t.ok( result.indexOf( 9) > result.indexOf( 8) )
  t.ok( result.indexOf(10) > result.indexOf( 5) )
  t.ok( result.indexOf(10) > result.indexOf( 9) )
  t.ok( result.indexOf(11) > result.indexOf(10) )
  t.ok( result.indexOf(12) > result.indexOf( 7) )
  t.ok( result.indexOf(12) > result.indexOf(11) )
  t.ok( result.indexOf(13) > result.indexOf(12) )
  t.end()
})

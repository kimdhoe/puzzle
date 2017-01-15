const test = require('tape')

// A BinarySearchTree (BST) is one of:
//   - null
//   - Node
//
// A Node is an object: { key:   number
//                      , left:  BST
//                      , right: BST
//                      }

// sample:
//         7
//      /    \
//     3      9
//    / \    / \
//   1   5  8  10
//      / \
//     4   6
const tree =
  { key:   7
  , left:  { key:   3
           , left:  { key:   1
                    , left:  null
                    , right: null
                    }
           , right: { key:   5
                    , left:  { key:   4
                             , left:  null
                             , right: null
                             }
                    , right: { key:   6
                             , left:  null
                             , right: null
                             }
                    }
           }
  , right: { key:   9
           , left:  { key:   8
                    , left:  null
                    , right: null
                    }
           , right: { key:   10
                    , left:  null
                    , right: null
                    }
           }
  }

//         7
//      /    \
//     3      9
//    / \    / \
//   1   5  8  10
//  / \
// 0   2
const tree2 =
  { key:   7
  , left:  { key:   3
           , left:  { key:   1
                    , left:  { key:   0
                             , left:  null
                             , right: null
                             }
                    , right: { key:   2
                             , left:  null
                             , right: null
                             }
                    }
           , right: { key:   5
                    , left:  null
                    , right: null
                    }
           }
  , right: { key:   9
           , left:  { key:   8
                    , left:  null
                    , right: null
                    }
           , right: { key:   10
                    , left:  null
                    , right: null
                    }
           }
  }

// search : BST * number -> BST
// (recursive)
const search = (root, x) =>
  !root || root.key === x ? root                  :
  x < root.key            ? search(root.left,  x) :
                            search(root.right, x)


test('search', t => {
  t.equal( search(tree, 11), null )
  t.deepEqual( search(tree, 5)
             , { key:   5
               , left:  { key:   4
                        , left:  null
                        , right: null
                        }
               , right: { key:   6
                        , left:  null
                        , right: null
                        }
               }
             )
  t.end()
})

// search2 : BST * number -> BST
// (non-recursive)
const search2 = (node, x) => {
  while (node && node.key !== x) {
    node = x < node.key ? node.left : node.right
  }

  return node
}

test('search2', t => {
  t.equal( search2(tree, 11), null )
  t.deepEqual( search2(tree, 5)
             , { key:   5
               , left:  { key:   4
                        , left:  null
                        , right: null
                        }
               , right: { key:   6
                        , left:  null
                        , right: null
                        }
               }
             )
  t.end()
})

// insert : BST * number -> BST
const insert = (root, x) => {
  if (!root)
    return { key: x, left: null, right: null }

  // node : BST
  let node  = root
  // child : BST
  // Initialize to a truthy value:
  //   If a node with the key x is already present, child will be set to null
  //   during the loop.
  let child = root
  // parent : BST
  let parent

  while (node && child) {
    if (node.key === x)
      child = null

    parent = node
    node = x < node.key ? node.left : node.right
  }

  if (child) {
    const child = { key: x, left: null, right: null }

    if (x < parent.key)
      parent.left = child
    else
      parent.right = child
  }

  return root
}

test('insert', t => {
  const newTree =
    { key:   7,
      left:  { key:   3
             , left:  { key:   1
                      , left:  null
                      , right: { key:   2
                               , left:  null
                               , right: null
                               }
                      }
            , right:  { key:   5
                      , left:  { key:   4
                               , left:  null
                               , right: null
                               }
                      , right: { key:   6
                               , left:  null
                               , right: null
                               }
                      }
            }
    , right: { key:   9
             , left:   { key:   8
                       , left:  null
                       , right: null
                       }
             , right:  { key:   10
                       , left:  null
                       , right: null
                       }
             }
    }

  t.deepEqual(insert(tree, 2), newTree)
  t.deepEqual(insert(tree, 5), tree)

  t.end()
})

// delete : BST * x -> BST
const del = (root, x) => {
  // node : BST
  let node = root
  // parent : BST
  let parent

  while (node && node.key !== x) {
    parent = node
    node = x < node.key ? node.left : node.right
  }

  if (!node)
    return root

  if (!node.left) {
    if (x <= parent.key)
      parent.left = node.right
    else
      parent.right = node.right
  }

  else if (!node.right) {
    if (x <= parent.key)
      parent.left = node.left
    else
      parent.right = node.left
  }

  else {
    let parentL = node
    let nodeL   = node.left

    while (nodeL.right) {
      parentL = nodeL
      nodeL   = nodeL.right
    }

    parentL.right = nodeL.left
    node.key      = nodeL.key
  }

  return root
}

test('delete', t => {
  t.deepEqual(
    del(tree2, 3)
  , { key:   7
    , left:  { key:   2
             , left:  { key:   1
                      , left:  { key:   0
                               , left:  null
                               , right: null
                               }
                      , right: null
                      }
             , right: { key:   5
                      , left:  null
                      , right: null
                      }
             }
    , right: { key:   9
             , left:  { key:   8
                      , left:  null
                      , right: null
                      }
             , right: { key:   10
                      , left:  null
                      , right: null
                      }
             }
    }
  )

  t.end()
})

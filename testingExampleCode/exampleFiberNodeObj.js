/* eslint-disable */
//essential props being pulled off React the fiber object to create the tree:
// memoizedState,
// memoizedProps,
// elementType,
// tag,
// actualDuration,
// actualStartTime,
// selfBaseDuration,
// sibling,
// child

//example fiberObj has a root fiber Node with one child node that has 2 children nodes

const fiberNode3 = {
  memoizedState: {
    baseQueue: null,
    baseState:  ['-', '-', 'X', '-', '-', '-', '-', '-', '-'],
    memoizedState:  ['-', '-', 'X', '-', '-', '-', '-', '-', '-'],
    next: null,
    queue: {
      dispatch: null,
      lastRenderedReducer: 'basicStateReducer(state, action)',
      lastRenderedState:  ['-', '-', 'X', '-', '-', '-', '-', '-', '-'],
      pending: null
    }
  },
  memoizedProps: {},
  elementType: {name: 'Board'},
  tag: 0,
  actualDuration: 1.9000000357627869,
  actualStartTime: 3505.699999988079,
  selfBaseDuration: 0.5,
  sibling: null,
  child: null,
  _debugHookTypes: ['useState', 'useState', 'useEffect'],
}

const fiberNode2 = {
  memoizedState: null,
  memoizedProps: {children: 'Tic Tac Toe'},
  elementType: 'h1',
  tag: 5,
  actualDuration: 0.09999999403953552,
  actualStartTime: 3505.5999999940395,
  selfBaseDuration: 0,
  sibling: fiberNode3,
  child: null
}


const fiberNode1 = {
  memoizedState: null,
  memoizedProps: {children: [fiberNode2.memoizedProps, fiberNode3.memoizedProps]},
  elementType: {name: 'App'},
  tag: 5,
  actualDuration: 2.0000000298023224,
  actualStartTime: 3505.5,
  selfBaseDuration: 0.4000000059604645,
  sibling: null,
  child: fiberNode2
}

const fiberObj = {
  sibling: null,
  child: fiberNode1,
  elementType: null,
  actualDuration: 2.100000023841858,
  actualStartTime: 3505.4000000059605,
  memoizedProps: null,
  memoizedState: {
    baseQueue: null,
    baseState: null,
    memoizedState: {
      current: true
    },
    next: null,
    queue: null
  },
  tag: 3, 
  selfBaseDuration: 1.300000011920929,
  expirationTime: 0,
  treeBaseDuration: 3.5000000298023224,
  lastEffect: {},
  ref: null,
  return: null,
  type: null,
  stateNode: 'FiberRootNode',
  updateQueue: null,
  childExpirationTime: 0,
  dependencies: null,
  effectTag: 0,
  expirationTime: 0,
  type: null,
  updateQueue: {},
  _debugHookTypes: null,
  _debugID: 1,
  _debugIsCurrentlyTiming: false,
  _debugNeedsRemount: false,
  _debugOwner: null,
  _debugSource: null
};

module.exports = fiberObj;
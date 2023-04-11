/* eslint-disable */
const makeTreeFunc = require('../src/backend/tree');
const exampleFiberObj = require('../testingExampleCode/exampleFiberNodeObj');
const exampleTree = require('../testingExampleCode/exampleTree');

test('tree.js exports a function', () => {
  expect(typeof makeTreeFunc).toEqual('function')
})

test('Check traversal function in tree.js is correctly traversing fiberObject', () => {
  const tree = makeTreeFunc(exampleFiberObj);
  expect(tree).toEqual(exampleTree);
})

test('Does not break if a property is not present on fiber Obj', () => {
  const incompleteFiberObj = {
    sibling: null,
    elementType: null,
    actualDuration: 2.100000023841858,
    actualStartTime: 3505.4000000059605,
    memoizedProps: null,
    tag: 3, 
    selfBaseDuration: 1.300000011920929
  };
  const tree = makeTreeFunc(incompleteFiberObj);
  expect(tree).toBeDefined;
})

test('output tree has a root property', () => {
  const tree = makeTreeFunc(exampleFiberObj);
  expect(tree).toHaveProperty('root');

})

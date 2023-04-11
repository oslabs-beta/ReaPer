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

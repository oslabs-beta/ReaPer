import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  EdgeText,
  useEdgesState,
  addEdge,
  edgeStyle,
} from 'reactflow';
import dagre from 'dagre';

import testTicTacToeTree from '../treeTestCode';

/**
 * Dummy data to be used for creating our tree traversal
 */

// const childNode13 = {
//   data: { name: 'Box 9' },
//   child: null,
//   sibling: null,
//   id: 13
// };

// const childNode12 = {
//   data: { name: 'Box 8' },
//   child: null,
//   sibling: childNode13,
//   id: 12
// };

// const childNode11= {
//   data: { name: 'Box 7' },
//   child: null,
//   sibling: childNode12,
//   id: 11
// };

// const childNode10 = {
//   data: { name: 'Box 6' },
//   child: null,
//   sibling: null,
//   id: 10
// };

// const childNode9 = {
//   data: { name: 'Box 5' },
//   child: null,
//   sibling: childNode10,
//   id: 9
// };

// const childNode8 = {
//   data: { name: 'Box 4' },
//   child: null,
//   sibling: childNode9,
//   id: 8
// };

// const childNode7 = {
//   data: { name: 'Box 3' },
//   child: null,
//   sibling: null,
//   id: 7
// };

// const childNode6 = {
//   data: { name: 'Box 2' },
//   child: null,
//   sibling: childNode7,
//   id: 6
// };

// const childNode5 = {
//   data: { name: 'Box 1' },
//   child: null,
//   sibling: childNode6,
//   id: 5
// };

// const childNode4 = {
//   data: { name: 'Row 3' },
//   child: childNode11,
//   sibling: null,
//   id: 4
// };

// const childNode3 = {
//   data: { name: 'Row 2' },
//   child: childNode8,
//   sibling: childNode4,
//   id: 3
// };

// const childNode2 = {
//   data: { name: 'Row 1' },
//   child: childNode5,
//   sibling: childNode3,
//   id: 2
// };

// const childNode1 = {
//   data: { name: 'Board' },
//   child: childNode2,
//   sibling: null,
//   id: 1
// };

// const fiberRoot = {
//   data: { name: 'App' },
//   child: childNode1,
//   sibling: null,
//   id: 0,
// };

// const testDataTree = createTree(fiberRoot);
// console.log(testDataTree);

// const edges = [
//   {
//     id: '1-2',
//     source: '1',
//     target: '2',
//     type: 'step',
//   },
//   {
//     id: '2-3',
//     source: '2',
//     target: '3',
//     type: 'step',
//   },
//   {
//     id: '2-4',
//     source: '2',
//     target: '4',
//     type: 'step',
//   },
//   {
//     id: '2-5',
//     source: '2',
//     target: '5',
//     type: 'step',
//   },
//   {
//     id: '3-6',
//     source: '3',
//     target: '6',
//     type: 'step',
//   },
//   {
//     id: '3-7',
//     source: '3',
//     target: '7',
//     type: 'step',
//   },
//   {
//     id: '3-8',
//     source: '3',
//     target: '8',
//     type: 'step',
//   },
//   {
//     id: '4-9',
//     source: '4',
//     target: '9',
//     type: 'step',
//   },
//   {
//     id: '4-10',
//     source: '4',
//     target: '10',
//     type: 'step',
//   },
//   {
//     id: '4-11',
//     source: '4',
//     target: '11',
//     type: 'step',
//   },
//   {
//     id: '5-12',
//     source: '5',
//     target: '12',
//     type: 'step',
//   },
//   {
//     id: '5-13',
//     source: '5',
//     target: '13',
//     type: 'step',
//   },
//   {
//     id: '5-14',
//     source: '5',
//     target: '14',
//     type: 'step',
//   },
// ];

// const nodes = [
//   {
//     id: '1', // required
//     position: { x: 0, y: 0 }, // required
//     data: { label: 'App' },
//   },
//   {
//     id: '2',
//     position: { x: 0, y: 100 },
//     data: { label: 'Board' },
//   },

//   {
//     id: '3',
//     position: { x: -600, y: 200 },
//     data: { label: 'Row' },
//   },
//   {
//     id: '4',
//     position: { x: 0, y: 200 },
//     data: { label: 'Row' },
//   },
//   {
//     id: '5',
//     position: { x: 600, y: 200 },
//     data: { label: 'Row' },
//   },

//   {
//     id: '6',
//     position: { x: -800, y: 300 },
//     data: { label: 'Box' },
//   },
//   {
//     id: '7',
//     position: { x: -600, y: 300 },
//     data: { label: 'Box' },
//   },
//   {
//     id: '8',
//     position: { x: -400, y: 300 },
//     data: { label: 'Box' },
//   },

//   {
//     id: '9',
//     position: { x: -200, y: 300 },
//     data: { label: 'Box' },
//   },
//   {
//     id: '10',
//     position: { x: 0, y: 300 },
//     data: { label: 'Box' },
//   },
//   {
//     id: '11',
//     position: { x: 200, y: 300 },
//     data: { label: 'Box' },
//   },

//   {
//     id: '12',
//     position: { x: 400, y: 300 },
//     data: { label: 'Box' },
//   },
//   {
//     id: '13',
//     position: { x: 600, y: 300 },
//     data: { label: 'Box' },
//   },
//   {
//     id: '14',
//     position: { x: 800, y: 300 },
//     data: { label: 'Box' },
//   },
// ];

const ComponentTree = () => {
  const nodes = [];
  const edges = [];

  // Breadth first search
  // Create a node for the current tree node we're looking at
  // Create the edge based on .parent and .data
  (() => {
    // Traverse through the tree using breadth first search
    const bfsQueue = [testTicTacToeTree.root];
    const idQueue = [];

    // Dagre graph setup code
    const width = 144;
    const height = 100;
    let dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setGraph({});
    dagreGraph.setDefaultEdgeLabel(function () {
      return {};
    });

    let id = 1;
    // Using breadth first search to look through the tree
    while (bfsQueue.length > 0) {
      const treeNode = bfsQueue.shift();
      // Create a node for the current Tree node
      dagreGraph.setNode(id, { label: treeNode.data.name, width, height });

      if (treeNode.parent !== null && idQueue.length > 0)
        dagreGraph.setEdge(idQueue.shift(), id);
      if (treeNode.children.length > 0) {
        bfsQueue.push(...treeNode.children);

        // Push ID into isQueue for the amount of children there are
        for (let i = 0; i < treeNode.children.length; i++) {
          idQueue.push(id);
        }
      }

      id++;
    }
    dagre.layout(dagreGraph);

    dagreGraph.nodes().forEach((nodeId) => {
      const node = dagreGraph.node(nodeId);
      // console.log('nodeerrrr:', node);
      // console.log(`x: ${node.x}, y: ${node.y}`);
      nodes.push({
        id: nodeId.toString(),
        data: { label: node.label },
        position: { x: node.x, y: node.y },
      });
    });

    dagreGraph.edges().forEach((edgeObj) => {
      const { v: sourceNodeId, w: targetNodeId } = edgeObj;
      edges.push({
        id: `${sourceNodeId}-${targetNodeId}`,
        source: sourceNodeId.toString(),
        target: targetNodeId.toString(),
      });
    });

    /**
     *   {
          id: '1', // required
          position: { x: 0, y: 0 }, // required
          data: { label: 'App' },
        },
     */

    // When pushing in the children, save how many children there are for the next iteration. Maybe use a queue for this as well (push num of children numChild times)
    // If it has a parent move it down by 100px in y.
    // Determine x by finding whether even or odd amount of children.
    //    If odd, make children arrange in a way such that middle child is directly under parent, and leftOfMid children are evenly spread amongst themselves, same with right
    //    If even, make children arrange in a way such that middle two children directly line up sharing space with parent and nothing in middle. '' ' ' ' ' '
    //
  })();
  // createNodesandEdges();

  return (
    <div id='tree-component-container'>
      <p>Virtual DOM</p>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeStyle={(id, type) => {
          return {
            strokeWidth: 2,
            stroke: '#000',
            transition: 'all 0.2s ease-in-out',
            ':hover': {
              stroke: 'blue',
              strokeWidth: 4,
            },
          };
        }}>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default ComponentTree;

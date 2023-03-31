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

/**
 * Dummy data to be used for creating our tree traversal
 */

const childNode13 = {
  data: { name: 'Box 9' },
  child: null,
  sibling: null,
  id: 13,
};

const childNode12 = {
  data: { name: 'Box 8' },
  child: null,
  sibling: childNode13,
  id: 12,
};

const childNode11 = {
  data: { name: 'Box 7' },
  child: null,
  sibling: childNode12,
  id: 11,
};

const childNode10 = {
  data: { name: 'Box 6' },
  child: null,
  sibling: null,
  id: 10,
};

const childNode9 = {
  data: { name: 'Box 5' },
  child: null,
  sibling: childNode10,
  id: 9,
};

const childNode8 = {
  data: { name: 'Box 4' },
  child: null,
  sibling: childNode9,
  id: 8,
};

const childNode7 = {
  data: { name: 'Box 3' },
  child: null,
  sibling: null,
  id: 7,
};

const childNode6 = {
  data: { name: 'Box 2' },
  child: null,
  sibling: childNode7,
  id: 6,
};

const childNode5 = {
  data: { name: 'Box 1' },
  child: null,
  sibling: childNode6,
  id: 5,
};

const childNode4 = {
  data: { name: 'Row 3' },
  child: childNode11,
  sibling: null,
  id: 4,
};

const childNode3 = {
  data: { name: 'Row 2' },
  child: childNode8,
  sibling: childNode4,
  id: 3,
};

const childNode2 = {
  data: { name: 'Row 1' },
  child: childNode5,
  sibling: childNode3,
  id: 2,
};

const childNode1 = {
  data: { name: 'Board' },
  child: childNode2,
  sibling: null,
  id: 1,
};

const fiberRoot = {
  data: { name: 'App' },
  child: childNode1,
  sibling: null,
  id: 0,
};

const edges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    type: 'step',
  },
  {
    id: '2-3',
    source: '2',
    target: '3',
    type: 'step',
  },
  {
    id: '2-4',
    source: '2',
    target: '4',
    type: 'step',
  },
  {
    id: '2-5',
    source: '2',
    target: '5',
    type: 'step',
  },
  {
    id: '3-6',
    source: '3',
    target: '6',
    type: 'step',
  },
  {
    id: '3-7',
    source: '3',
    target: '7',
    type: 'step',
  },
  {
    id: '3-8',
    source: '3',
    target: '8',
    type: 'step',
  },
  {
    id: '4-9',
    source: '4',
    target: '9',
    type: 'step',
  },
  {
    id: '4-10',
    source: '4',
    target: '10',
    type: 'step',
  },
  {
    id: '4-11',
    source: '4',
    target: '11',
    type: 'step',
  },
  {
    id: '5-12',
    source: '5',
    target: '12',
    type: 'step',
  },
  {
    id: '5-13',
    source: '5',
    target: '13',
    type: 'step',
  },
  {
    id: '5-14',
    source: '5',
    target: '14',
    type: 'step',
  },
];

const nodes = [
  {
    id: '1', // required
    position: { x: 0, y: 0 }, // required
    data: { label: 'App' },
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    data: { label: 'Board' },
  },

  {
    id: '3',
    position: { x: -600, y: 200 },
    data: { label: 'Row' },
  },
  {
    id: '4',
    position: { x: 0, y: 200 },
    data: { label: 'Row' },
  },
  {
    id: '5',
    position: { x: 600, y: 200 },
    data: { label: 'Row' },
  },

  {
    id: '6',
    position: { x: -800, y: 300 },
    data: { label: 'Box' },
  },
  {
    id: '7',
    position: { x: -600, y: 300 },
    data: { label: 'Box' },
  },
  {
    id: '8',
    position: { x: -400, y: 300 },
    data: { label: 'Box' },
  },

  {
    id: '9',
    position: { x: -200, y: 300 },
    data: { label: 'Box' },
  },
  {
    id: '10',
    position: { x: 0, y: 300 },
    data: { label: 'Box' },
  },
  {
    id: '11',
    position: { x: 200, y: 300 },
    data: { label: 'Box' },
  },

  {
    id: '12',
    position: { x: 400, y: 300 },
    data: { label: 'Box' },
  },
  {
    id: '13',
    position: { x: 600, y: 300 },
    data: { label: 'Box' },
  },
  {
    id: '14',
    position: { x: 800, y: 300 },
    data: { label: 'Box' },
  },
];

const ComponentTree = () => {
  // const nodes = [];

  // Breadth first search
  // Create a node for the current tree node we're looking at
  // Create the edge based on .parent and .data
  // const createNodesandEdges = () => {
  //   // Traverse through the tree using breadth first search
  //   const queue = [testDataTree.root];
  //   let id = 1;
  //   while (queue.length > 0) {
  //     const treeNode = queue.shift();
  //     // Create a node for the current Tree node
  //     nodes.push({
  //       id: id++,
  //       position: {},
  //       data: { label: treeNode.data.name },
  //     });
  //     queue.push(...treeNode.children);
  //     console.log(treeNode);
  //   }
  //   /**
  //    *   {
  //         id: '1', // required
  //         position: { x: 0, y: 0 }, // required
  //         data: { label: 'App' },
  //       },
  //    */
  // };

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

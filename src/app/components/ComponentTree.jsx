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
import createTree from '../test';
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

// also need totalRenderDurationMS
// renderDurationMS

const ComponentTree = (props) => {
  return (
    <div id='tree-component-container'>
      <p>Virtual DOM</p>
      <ReactFlow
        nodes={props.displayTree.nodes}
        edges={props.displayTree.edges}
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
        <MiniMap pannable />
      </ReactFlow>
    </div>
  );
};

export default ComponentTree;

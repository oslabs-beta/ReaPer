import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

const edges = [{
  id: '1-2',
  source: '1',
  target: '2',
  type: 'step',
}];

const nodes = [
  {
    id: '1', // required
    position: { x: 0, y: 0 }, // required
    data: { label: 'App' },
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'Component' },
  },
];

const ComponentTree = () => {
  return (
    <div id="tree-component-container">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ComponentTree;

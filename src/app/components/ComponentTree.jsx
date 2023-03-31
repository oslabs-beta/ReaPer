import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

const nodes = [
  {
    id: '1', // required
    position: { x: 0, y: 0 }, // required
    data: { label: 'App' },
  },
];

const ComponentTree = () => {
  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ComponentTree;

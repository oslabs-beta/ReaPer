import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import '../styles/style.css';

const nodes = [
  {
    id: '1', // required
    position: { x: 0, y: 0 }, // required
  },
];

const ComponentTree = () => {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ComponentTree;

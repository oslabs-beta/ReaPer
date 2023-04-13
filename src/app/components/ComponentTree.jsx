import React from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
} from 'reactflow';
import dagre from 'dagre';
import createTree from '../test';
import ReaperNode from './ReaperNode';

const nodeTypes = { reaperFlowNode: ReaperNode };
const minimapStyle = {
  height: 66,
  width: 117,
};

const ComponentTree = (props) => {
  return (
    <div id='tree-component-container'>
      <p>Virtual DOM</p>
      <ReactFlow
        nodeTypes={nodeTypes}
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
        }}
        fitView>
        <Background />
        <Controls />
        <MiniMap
          zoomable
          pannable
          style={minimapStyle}
        />
      </ReactFlow>
    </div>
  );
};

export default ComponentTree;

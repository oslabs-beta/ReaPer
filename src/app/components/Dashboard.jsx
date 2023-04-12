import React, { useEffect, useState } from 'react';
import dagre from 'dagre';

import ComponentTree from './ComponentTree';
import RenderEvents from './RenderEvents';
import ComponentsRanked from './ComponentsRanked';
import RenderedComponents from './RenderedComponents';
import { render } from 'react-dom';

function Dashboard(props) {
  /**
   * State Variables
   */
  // This will hold nodes and edges for each renderEvent tree in the form of an object
  //  with properties nodes and edges.
  const [nodesAndEdges, setNodesAndEdges] = useState([]);
  // Hold the current nodesAndEdge object that is to be displayed in the componentTree
  const [flowDisplayTree, setFlowDisplayTree] = useState({});

  // Used for RenderEvents
  const [renderTimes, setRenderTimes] = useState([]);

  // This will hold all component render times
  const [componentRenderTimes, setComponentRenderTimes] = useState([]);
  // Holds the current componentRenderTime object that is to be displayed in the components ranked
  const [componentsRankedDisplay, setComponentsRankedDisplay] = useState({});

  // Update only when props is updated
  useEffect(() => {
    const { renderEventList } = props.reaperSessionObj;
    const newRenderTimes = [];
    const newNodesAndEdges = [];
    const newComponentRenderTimes = [];

    console.log('Dashboard: This is our render event list! ', renderEventList);

    // Deconstruct our reaperSessionObj
    for (let i = 0; i < renderEventList.length; i++) {
      newRenderTimes.push(renderEventList[i].totalRenderDurationMS);
      newNodesAndEdges.push(createNodesAndEdges(renderEventList[i].tree.root, i));
      newComponentRenderTimes.push(getComponentRenderTimes(renderEventList[i].tree.root));
    }

    setComponentRenderTimes(newComponentRenderTimes);
    setNodesAndEdges(newNodesAndEdges);
    setRenderTimes(newRenderTimes);

    // Display the first renderEvent data by default in the corresponding charts
    setFlowDisplayTree(newNodesAndEdges[0]);
    setComponentsRankedDisplay(newComponentRenderTimes[0]);
  }, [props]);

  // const deconstructReaperSessionObj = () => {

  // };

  const getComponentRenderTimes = (root) => {
    // Skip over the root component in React fiber
    const bfsQueue = [...root.children];
    const treeComponentRenderTimes = {};
    let componentCounter = 1;

    while (bfsQueue.length > 0) {
      const treeNode = bfsQueue.shift();

      // Key: component name
      // Value: time it took to render the component
      if (treeComponentRenderTimes[treeNode.componentName]) {
        componentCounter++;
        treeComponentRenderTimes[`${treeNode.componentName}-${componentCounter}`] = treeNode.renderDurationMS;
      } else {
        componentCounter = 1;
        treeComponentRenderTimes[treeNode.componentName] = treeNode.renderDurationMS;
      }

      if (treeNode.children.length > 0) bfsQueue.push(...treeNode.children);
    }

    return treeComponentRenderTimes;
  };

  // Breadth first search
  // Create a node for the current tree node we're looking at
  // Create the edge based on .parent and .data
  const createNodesAndEdges = (root, index) => {
    const nodes = [];
    const edges = [];

    // Traverse through the tree using breadth first search
    // Skip over the root component in React fiber
    const bfsQueue = [...root.children];
    const idQueue = [];

    // Dagre graph setup code
    const width = 144;
    const height = 100;
    let dagreGraph = new dagre.graphlib.Graph({ rankdir: 'TB' });
    dagreGraph.setGraph({});
    dagreGraph.setDefaultEdgeLabel(function () {
      return {};
    });

    let id = 1;
    // Using breadth first search to look through the tree
    while (bfsQueue.length > 0) {
      const treeNode = bfsQueue.shift();

      // Create a node for the current Tree node
      // dagreGraph.setNode(id, { label: treeNode.componentName, width, height });
      dagreGraph.setNode(id, { label: `${treeNode.componentName}-${index}`, width, height });

      if (idQueue.length > 0) {
        const parentId = idQueue.shift();
        dagreGraph.setEdge(parentId, id);
      }

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
    // Package node and edges into object then store into state within an array
    return {
      nodes,
      edges,
    };
  };

  return (
    <div id='content'>
      <div className='row'>
        <div className='column'>
          <div className='graph'>
            <RenderEvents
              nodesAndEdges={nodesAndEdges}
              setFlowDisplayTree={setFlowDisplayTree}
              componentRenderTimes={componentRenderTimes}
              setComponentsRankedDisplay={setComponentsRankedDisplay}
              renderTimes={renderTimes}
            />
          </div>
        </div>
        <div className='column'>
          <div className='graph'>
            <RenderedComponents />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='column'>
          <div className='graph'>
            <ComponentsRanked componentsRankedDisplay={componentsRankedDisplay} />
          </div>
        </div>
        <div className='column'>
          <div className='graph'>
            <ComponentTree displayTree={flowDisplayTree} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Maybe use state to determine whether or not we have a total of > 1 event
// Create tree in this file
// Then distribute to it's sub portions make up the whole!
export default Dashboard;

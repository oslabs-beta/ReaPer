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

  //State to store data for RenderedComponents
  const [componentRenderData, setComponentRenderData] = useState([]);

  // State to hold RenderedComponents Data (componentName, occurrence, avg RenderDurationMS)
  // Update only when props is updated
  useEffect(() => {
    const { renderEventList } = props.reaperSessionObj;
  

    const newRenderTimes = [];
    const newNodesAndEdges = [];
    const newComponentRenderTimes = [];

    const newComponentRenderData = [];

    console.log('Dashboard: This is our render event list! ', renderEventList);

    // Deconstruct our reaperSessionObj
    for (let i = 0; i < renderEventList.length; i++) {
      newRenderTimes.push(renderEventList[i].totalRenderDurationMS);
      newNodesAndEdges.push(createNodesAndEdges(renderEventList[i].tree.root, i));
      newComponentRenderTimes.push(getComponentRenderTimes(renderEventList[i].tree.root));
    }

    createComponentRenderData(renderEventList);

    setComponentRenderTimes(newComponentRenderTimes);
    setNodesAndEdges(newNodesAndEdges);
    setRenderTimes(newRenderTimes);

    // Display the first renderEvent data by default in the corresponding charts
    setFlowDisplayTree(newNodesAndEdges[0]);
    setComponentsRankedDisplay(newComponentRenderTimes[0]);
  }, [props]);

  // const deconstructReaperSessionObj = () => {

  // };

  const createComponentRenderData = (renderEvents) => {
    const totalComponentStats = {};

    const bfs = (...componentTree) => {
      const bfsQueue = [...componentTree];

      while (bfsQueue.length > 0) {
        const treeNode = bfsQueue.shift();
        // Create a property with key; componentName. If the key on component is filled in, then include in the key name otherwise don't.
        if (Object.hasOwn(totalComponentStats, `${treeNode.componentName}${treeNode.key ? `-${treeNode.key}` : ''}`)) {
          totalComponentStats[`${treeNode.componentName}${treeNode.key ? `-${treeNode.key}` : ''}`].timesRendered++;
          totalComponentStats[`${treeNode.componentName}${treeNode.key ? `-${treeNode.key}` : ''}`].avgRenderDuration += treeNode.renderDurationMS;
        } else {
          totalComponentStats[`${treeNode.componentName}${treeNode.key ? `-${treeNode.key}` : ''}`] = {
            timesRendered: 1,
            avgRenderDuration: treeNode.renderDurationMS,
          };
        }

        if (treeNode.children.length > 0) bfsQueue.push(...treeNode.children);
      }
    };

    // For the amount of renderEvents go through each tree and get the stats for each component
    for (const renderEvent of renderEvents) {
      bfs(...renderEvent.tree.root.children);
    }

    // Get the avg for each component
    for (const component in totalComponentStats) {
      totalComponentStats[component].avgRenderDuration /=
        totalComponentStats[component].timesRendered;
    }

    setComponentRenderData(totalComponentStats);
  };

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
        treeComponentRenderTimes[
          `${treeNode.componentName}-${componentCounter}`
        ] = treeNode.renderDurationMS;
      } else {
        componentCounter = 1;
        treeComponentRenderTimes[treeNode.componentName] =
          treeNode.renderDurationMS;
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
    /**
     * - dagreTreeNodeInfo is an object:
     *    key: dagreNode ID
     *    value: the info we want to save from the TreeNode obj
     * - dagre graph nodes don't allow other info to be stored on it, but we
     *   need to save the TreeNode info for the React Flow graph, so we'll use
     *   dagreTreeNodeInfo for this purpose
     */
    let dagreTreeNodeInfo = {};
    // Using breadth first search to look through the tree
    while (bfsQueue.length > 0) {
      const treeNode = bfsQueue.shift();

      // Create a node for the current Tree node
      // dagreGraph.setNode(id, { label: treeNode.componentName, width, height });
      dagreGraph.setNode(id, {
        label: `${treeNode.componentName}-${index}`,
        width,
        height,
      });

      dagreGraph.setNode(id, { label: `${treeNode.componentName}-${index}`, width, height });
      dagreTreeNodeInfo[id] = {
        componentProps: treeNode.componentProps,
        componentState: treeNode.componentState,
      };

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
        data: {
          label: node.label,
          componentProps: dagreTreeNodeInfo[nodeId].componentProps,
          componentState: dagreTreeNodeInfo[nodeId].componentState,
        },
        position: { x: node.x, y: node.y },
        type: 'reaperFlowNode',
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
            <RenderedComponents componentRenderData={componentRenderData} />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='column'>
          <div className='graph'>
            <ComponentsRanked
              componentsRankedDisplay={componentsRankedDisplay}
            />
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

export default Dashboard;

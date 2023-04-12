import { getFiberNodeTagName } from './helperFns.js';


// define structure of tree

/* eslint-disable */
class TreeNode {
  constructor (fiberNode) {

    const {
      memoizedState,
      memoizedProps,
      elementType,
      tag,
      actualDuration,
      actualStartTime,
      selfBaseDuration
    } = fiberNode;

    this.children = [];

    /*
      - tagObj identifies the type of fiber
      - Has two keys:
        1. tag - the tag number from React
        2. tagName - the name corresponding with the tag number
    */
    this.setTagObj(tag);
    this.setComponentName(elementType);
    this.setProps(memoizedProps);
    this.setState(memoizedState);
   

    /*
      - The actual duration is the time spent rendering this Fiber and its descendants for the current update.
      - It includes time spent working on children.
    */
    this.setRenderDurationMS(actualDuration);

    // Not sure if we need these, but saving them anyway

    /*
      - actualStartTime = If the Fiber is currently active in the "render" phase, it marks the time at which the work began.
      - This field is only set when the enableProfilerTimer flag is enabled.
    */
    this.actualStartTime = actualStartTime;

    /*
      - selfBaseDuration = Duration of the most recent render time for this Fiber.
      - This value is not updated when we bailout for memoization purposes.
      - This field is only set when the enableProfilerTimer flag is enabled.
    */
    this.selfBaseDuration = selfBaseDuration;
    
  }

  addChild(newNode) {
    if (newNode) {
      // Don't set the parent - this causes issues when trying to invoke JSON.stringify
      // on the ReaperSession obj.
      //newNode.parent = this;
      this.children.push(newNode);
    }
  }

  setComponentName(elementType) {
    try {
      if (elementType && Object.hasOwn(elementType, 'name')) {
        // Root node will always have the hardcoded component name 'root'
        this.componentName = this.tagObj.tagName === 'Host Root' ? 'Root' : elementType.name;
      } else {
        this.componentName = '';
      }
    } catch (error) {
      console.log('tree.setComponentName error:', error.message);
    }
  }

  setTagObj(fiberTagNum) {
    try {   
      if (fiberTagNum !== undefined && fiberTagNum !== null) {
        this.tagObj = {
          tag: fiberTagNum,
          tagName: getFiberNodeTagName(fiberTagNum)
        }
      } else {
        console.log('tree.setTagObj: fiberTagName is undefined!');
      }
    } catch (error) {
      console.log('tree.setTagObj error:', error.message);
    }
  }

  setRenderDurationMS(actualDuration) {
    this.renderDurationMS = actualDuration;
  }

  setState(memoizedState) {
    this.componentState = memoizedState;
  }

  setProps(memoizedProps) {
    this.componentProps = memoizedProps;
  }



}

class Tree {
  constructor(rootFiberNode) {
    this.root = null;
    this.buildTree(rootFiberNode);
  }

  buildTree(rootFiberNode) {
    function traverse(fiberNode, parentTreeNode) {
      const {
        tag
      } = fiberNode;
      const tagName = getFiberNodeTagName(tag);

      let newNode;
      if (tagName === 'Function Component' || tagName === 'Class Component' || tagName === 'Host Root') {
        // Create a TreeNode using the FiberNode
        newNode = new TreeNode(fiberNode);

        // If parentTreeNode is null, set the root of the tree
        if (!parentTreeNode) {
          this.root = newNode;
        } else {
          // Add the new TreeNode to the parent's children array
          parentTreeNode.addChild(newNode);
        }
      }

      // If fiberNode has a child, traverse down the tree
      if (fiberNode.child) {
        traverse(fiberNode.child, newNode ? newNode : parentTreeNode);
      }

      // If fiberNode has a sibling, traverse to the sibling
      if (fiberNode.sibling) {
        traverse(fiberNode.sibling, parentTreeNode);
      }
    }

    traverse.call(this, rootFiberNode, null);
  }
}



// Function to create a tree
const createTree = (fiberObj) => {
  const tree = new Tree(fiberObj);
  // console.log('CreateTree: fiberObj=', fiberObj);
  // console.log('CreateTree: tree=', tree);
  return tree;
};

export default createTree;


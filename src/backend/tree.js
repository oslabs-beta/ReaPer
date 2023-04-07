import { getFiberNodeTagName } from './helperFns';
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
    this.parent = null;

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
      newNode.parent = this;
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
  console.log('CreateTree: fiberObj=', fiberObj);
  console.log('CreateTree: tree=', tree);
  return tree;
};

export default createTree;

// Hard-coded tests
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
//   child: null,
//   sibling: null,
//   id: 4
// };

// const childNode3 = {
//   data: { name: 'Row 2' },
//   child: null,
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
//   id: 0
// };

// console.log(createTree(fiberRoot));

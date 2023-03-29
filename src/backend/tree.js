// define structure of tree

/* eslint-disable */
class TreeNode {
  constructor (data){
    this.data = data;
    this.children = [];
    this.parent = null;
  }

  addChild(newNode) {
    newNode.parent = this;
    this.children.push(newNode);
  }
}

class Tree {

  constructor(rootFiberNode) {
    this.root = null;
    console.log(rootFiberNode)
    this.buildTree(rootFiberNode);
  }

  buildTree(rootFiberNode) {

    function traverse(fiberNode, parentTreeNode, tree) {
      const queue = [fiberNode];
      const visited = new Set();

      while (queue.length > 0) {
        // Pop the first FiberNode from the queue
        const currFiberNode = queue.shift();
        // Create a TreeNode using the FiberNode from the queue
        const newNode = new TreeNode(currFiberNode);
        // If parentTreeNode is null, set the root on the tree
        if (parentTreeNode === null) {
          tree.root = newNode;
        }
        // Else, add the new TreeNode to the parent's children array
        else {
          parentTreeNode.children.push(newNode)
        }
        // Need to add all of the siblings to the queue
        const curSiblingFiberNode = newNode.sibling;
        while (curSiblingFiberNode !== null && curSiblingFiberNode !== undefined) {
          if (!visited.has(curSiblingFiberNode)) {
            queue.push(curSiblingFiberNode);
            visited.add(curSiblingFiberNode)
          }
          curSiblingFiberNode = curSiblingFiberNode.next;
        }

        // If fiberNode has a child, add it to the queue
        if (currFiberNode.child) {
          queue.push(currFiberNode.child);
        }
      }
    }

    traverse(rootFiberNode, null, this);
  }

    
}



// function to create a tree
const createTree = (fiberObj) => {
  const tree = new Tree(fiberObj);
  return tree;
}
// RenderEvent Object
// session object

const childNode2 = {
  data: {
    child: null,
    sibling: null
  },
  id: 2
  
}
const childNode1 = {
  data: {
    child: null,
    sibling: childNode2
  },
  id: 1

  
}

// const fiberRoot = {
//   data: 0,
//   child: childNode1,
//   sibling: null
  
// }

const fiberRoot = {
  data: {
    child: childNode1,
    sibling: null
  },
  id: 0
}
console.log(createTree(fiberRoot))

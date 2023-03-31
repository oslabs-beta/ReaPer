// define structure of tree

/* eslint-disable */
class TreeNode {
  constructor (data){
    this.data = data;
    this.children = [];
    this.parent = null;
  }

  addChild(newNode) {
    if (newNode) {
      newNode.parent = this;
      this.children.push(newNode);
    }
  }
}

/*ITERATIVE ATTEMPT --- DOESN'T WORK */
// class Tree {

//   constructor(rootFiberNode) {
//     this.root = null;
//     this.buildTree(rootFiberNode);
//   }

//   buildTree(rootFiberNode) {
//     function traverse(fiberNode, parentTreeNode, tree) {
//       const queue = [fiberNode];
//       const visited = new Set();
//       let lastParentNode = parentTreeNode; //to track new parent node for child nodes more than 1 layer below root

//       while (queue.length > 0) {
//         // Pop the first FiberNode from the queue
//         let currFiberNode = queue.shift();

//         // Create a TreeNode using the FiberNode from the queue
//         const newNode = new TreeNode(currFiberNode.data);

//         // If parentTreeNode is null, set the root on the tree
//         if (parentTreeNode === null) {
//           tree.root = newNode;
//           parentTreeNode = tree.root;
//         }
//         // Else, add the new TreeNode to the parent's children array
//         else {
//           parentTreeNode.addChild(newNode);
//         }

//         // Need to add all of the siblings to the queue
//         let curSiblingFiberNode = currFiberNode.sibling;
//         while (curSiblingFiberNode !== null && curSiblingFiberNode !== undefined) {
//           if (!visited.has(curSiblingFiberNode)) {
//             queue.push(curSiblingFiberNode);
//             visited.add(curSiblingFiberNode);
//           }
//           curSiblingFiberNode = curSiblingFiberNode.sibling;
//         }

//         // If fiberNode has a child, add it to the queue
//         if (currFiberNode.child) {
//           queue.push(currFiberNode.child);
//           lastParentNode = parentTreeNode;
//           parentTreeNode = newNode;
//         }
//       }
//     }

//     traverse(rootFiberNode, null, this);
//   }

        
// }


class Tree {
  constructor(rootFiberNode) {
    this.root = null;
    this.buildTree(rootFiberNode);
  }

  buildTree(rootFiberNode) {
    function traverse(fiberNode, parentTreeNode) {
      // Create a TreeNode using the FiberNode
      const newNode = new TreeNode(fiberNode.data);

      // If parentTreeNode is null, set the root of the tree
      if (!parentTreeNode) {
        this.root = newNode;
      } else {
        // Add the new TreeNode to the parent's children array
        parentTreeNode.addChild(newNode);
      }

      // If fiberNode has a child, traverse down the tree
      if (fiberNode.child) {
        traverse(fiberNode.child, newNode);
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
export const createTree = (fiberObj) => {
  const tree = new Tree(fiberObj);
  return tree;
};

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

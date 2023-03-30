// class TreeNode {
//     constructor (data){
//       this.data = data;
//       this.children = [];
//       this.parent = null;
//     }
  
//     addChild(newNode) {
//       newNode.parent = this;
//       this.children.push(newNode);
//     }
//   }
  
  
//   class Tree {
  
//     constructor(rootFiberNode) {
//       this.root = null;
//       this.buildTree(rootFiberNode);
//     }
  
//     buildTree(rootFiberNode) {
//       function traverse(fiberNode, parentTreeNode, tree) {
//         const queue = [fiberNode];
//         const visited = new Set();
//         let lastParentNode = parentTreeNode; //to track new parent node for child nodes more than 1 layer below root
  
//         while (queue.length > 0) {
//           // Pop the first FiberNode from the queue
//           let currFiberNode = queue.shift();
  
//           // Create a TreeNode using the FiberNode from the queue
//           const newNode = new TreeNode(currFiberNode.data);
  
//           // If parentTreeNode is null, set the root on the tree
//           if (parentTreeNode === null) {
//             tree.root = newNode;
//             parentTreeNode = tree.root;
//           }
//           // Else, add the new TreeNode to the parent's children array
//           else {
//             if (currFiberNode === parentTreeNode.data) {
//               // If the current FiberNode is the parent of the previous FiberNode in the queue,
//               // update the lastParentNode to the previous FiberNode's corresponding TreeNode
//               lastParentNode = parentTreeNode;
//             }
//             else if (currFiberNode === lastParentNode.data) {
//               // If the current FiberNode is the child of the last parent node, update the parentTreeNode
//               parentTreeNode = lastParentNode;
//             }
//             parentTreeNode.addChild(newNode);
//           }
  
//           // Need to add all of the siblings to the queue
//           let curSiblingFiberNode = currFiberNode.sibling;
//           while (curSiblingFiberNode !== null && curSiblingFiberNode !== undefined) {
//             if (!visited.has(curSiblingFiberNode)) {
//               queue.push(curSiblingFiberNode);
//               visited.add(curSiblingFiberNode);
//             }
//             curSiblingFiberNode = curSiblingFiberNode.sibling;
//           }
  
//           // If fiberNode has a child, add it to the queue
//           if (currFiberNode.child) {
//             queue.push(currFiberNode.child);
//             lastParentNode = parentTreeNode;
//             parentTreeNode = newNode;
//           }
//         }
//       }
  
//       traverse(rootFiberNode, null, this);
//     }
  
          
//   }
  

// export default Tree;



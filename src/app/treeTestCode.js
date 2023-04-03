class TreeNode {
  constructor(data) {
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

class Tree {
  constructor(rootFiberNode) {
    this.root = null;
  }
}

const testTicTacToeTree = new Tree;

// root/app details
testTicTacToeTree.root = new TreeNode({ name: 'App' });
testTicTacToeTree.root.addChild(new TreeNode);

// Board details
testTicTacToeTree.root.children[0].data = {name: 'Board'};
testTicTacToeTree.root.children[0].addChild(new TreeNode);
testTicTacToeTree.root.children[0].addChild(new TreeNode);
testTicTacToeTree.root.children[0].addChild(new TreeNode);

// Row 1 details
testTicTacToeTree.root.children[0].children[0].data = {name: 'Row 1'};
testTicTacToeTree.root.children[0].children[0].addChild(new TreeNode);
testTicTacToeTree.root.children[0].children[0].addChild(new TreeNode);
testTicTacToeTree.root.children[0].children[0].addChild(new TreeNode);

// Box 1 details
testTicTacToeTree.root.children[0].children[0].children[0].data = {name: 'Box 1'};
// Box 2 details
testTicTacToeTree.root.children[0].children[0].children[1].data = {name: 'Box 2'};
// Box 3 details
testTicTacToeTree.root.children[0].children[0].children[2].data = {name: 'Box 3'};



// Row 2 details
testTicTacToeTree.root.children[0].children[1].data = {name: 'Row2'};
testTicTacToeTree.root.children[0].children[1].addChild(new TreeNode);
testTicTacToeTree.root.children[0].children[1].addChild(new TreeNode);
testTicTacToeTree.root.children[0].children[1].addChild(new TreeNode);

// Box 4 details
testTicTacToeTree.root.children[0].children[1].children[0].data = {name: 'Box 4'};
// Box 5 details
testTicTacToeTree.root.children[0].children[1].children[1].data = {name: 'Box 5'};
// Box 6 details
testTicTacToeTree.root.children[0].children[1].children[2].data = {name: 'Box 6'};

// Row 3 details
testTicTacToeTree.root.children[0].children[2].data = {name: 'Row3'};
testTicTacToeTree.root.children[0].children[2].addChild(new TreeNode);
testTicTacToeTree.root.children[0].children[2].addChild(new TreeNode);
testTicTacToeTree.root.children[0].children[2].addChild(new TreeNode);

// Box 7 details
testTicTacToeTree.root.children[0].children[2].children[0].data = {name: 'Box 7'};
// Box 8 details
testTicTacToeTree.root.children[0].children[2].children[1].data = {name: 'Box 8'};
// Box 9 details
testTicTacToeTree.root.children[0].children[2].children[2].data = {name: 'Box 9'};

// // Display the test data
// const bfs = root => {
//   const queue = [root.root];
//   console.log('I am here');
//   while (queue.length > 0) {
//     const currNode = queue.shift();
//     console.log(currNode);
//     if (currNode.children.length > 0) {
//       queue.push(...currNode.children);
//     }
//   }
// }
// bfs(testTicTacToeTree);

export default testTicTacToeTree;
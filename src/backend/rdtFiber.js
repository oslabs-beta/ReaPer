// import treeNode, snapshot

let rdtFiberRootNode = null;
// to hold the array of render events
const renderEvents = new Map();

// update tree snapshot
const updateTreeSnapshot = (/* ss */) => {
  // if rdtFiberRootNode is available, extract the current property
  if (rdtFiberRootNode) {
    const { current } = rdtFiberRootNode;
    // create a Fiber tree with the tree function with current (parameter: current)
    // in types.js: create Fiber type with all property types
    // current properties become Tree's fiber data properties on tree
    // do we also need a ss
    // TO BE FILLED

  }

}

// connect to React DevTools global hook
export default () => {
  return () => {
    // __REACT_DEVTOOLS_GLOBAL_HOOK__ is a global object installed by React Devtools extension's content script that gives access to React fiber nodes
    const rdt = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

    // check if RDT's global object is installed
    if (!rdt) return;

    // check if application is a React application by checking for a React instance
    const isReact = rdt.renderers.get(1);
    if (!isReact) return;

    // get fiberNode information and intercept
    if (isReact) {
      rdtFiberRootNode = rdt.getFiberRoots(1).values().next().value;

      // preserve origial onCommitFiberRoot
      const rdtOnCommitFiberRoot = rdt.onCommitFiberRoot;
      // intercept the original onCommitFiberRoot with middleware
      const intercept = function (rdtOnCommit) {
        return function (...args) {
          rdtFiberRootNode = args[1] // root argument (args: rendererID, root, priorityLevel)
          // return RDT's onCommitFiberRoot with its args
          return rdtOnCommitFiberRoot(...args);
        }
      }
      rdt.onCommitFiberRoot = rdtOnCommitFiberRoot(rdt.onCommitFiberRoot);

      // update tree snapshot
      updateTreeSnapshot();
    }
  };
};
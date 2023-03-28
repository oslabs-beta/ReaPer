// connect to React DevTools global hook

// to hold the array of render events
const renderEvents = new Map();

export default () => {
  return () => {
    const rdt = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  };

  // preserve origial onCommitFiberRoot
  const rdtOnCommitFiberRoot = rdt.onCommitFiberRoot;
  // intercept the original onCommitFiberRoot with middleware
  const intercept = function (rdtOnCommit) {
    
  }
};
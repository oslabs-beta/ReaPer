import ReaperSession from './ReaperSession';
import RenderEvent from './RenderEvent';

// Set global variable to use across functions
// for access to React DevTools global hook for before and after record session
let rdt;
// for access to React devTools fiber root node
let rdtFiberRootNode = null;
// for access to React devTools onCommitFiberRoot method to be initialized in connectToReact,
// and to be mutated in intercept function, and again in endReaperSession
let rdtOnCommitFiberRoot;
// to initialize on a ReaperSession instantiation and access method
let reaperSession;
// verification for session in progress
let sessionInProgress = false;

// Instantiates RenderEvent to create a Tree of the Fiber Root Node
// and add to reaperSession's renderEventList
// To be invoked in intercept function's return function
const updateRenderEvent = (fiberRootNode) => {
  // intantiate RenderEvent
  const newRenderEvent = new RenderEvent(rdtFiberRootNode);
  // add newRenderEvent to RenderEventList object on ReaperSession instantiation
  reaperSession.addRenderEvent(newRenderEvent);
};

// Connect to React DevTools global hook
function connectToReact() {
  // __REACT_DEVTOOLS_GLOBAL_HOOK__ is a global object installed
  // by React Devtools (RDT) extension's content script that gives access to React fiber nodes
  rdt = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  // check if RDT's global object is installed
  if (!rdt) return;
  // Pass error message to the frontend if React devTools is not present
  // window.postMessage();*****

  // check if application is a React application by checking for a React instance
  const isReact = rdt.renderers.get(1);
  if (!isReact) return;
  // Pass error message to the frontend if user application is not a React app
  // window.postMessage();******

  // get fiberNode information and intercept
  if (isReact) {
    rdtFiberRootNode = rdt.getFiberRoots(1).values().next().value;

    // preserve origial onCommitFiberRoot
    rdtOnCommitFiberRoot = rdt.onCommitFiberRoot;

    // intercept the original onCommitFiberRoot
    const intercept = function (rdtOnCommit) {
      return function (...args) {
        rdtFiberRootNode = args[1]; // root argument (args: rendererID, root, priorityLevel)
        // Invoke updateRenderEvent
        updateRenderEvent(rdtFiberRootNode);
        // return RDT's onCommitFiberRoot with its args
        return rdtOnCommitFiberRoot(...args);
      };
    };
    rdt.onCommitFiberRoot = intercept(rdt.onCommitFiberRoot);
  }
}

// When a user starts a record session startReaperSession will be invoked in the background script
export const startReaperSession = () => {
  // check current value of sessionInProgress
  if (!sessionInProgress) {
    sessionInProgress = true;
    reaperSession = new ReaperSession();
    connectToReact();
  }
};

// This function undoes what intercept function does
// It will be invoked once user stops recording session
export const endReaperSession = () => {
  // check if sessionInProgress is already false
  if (sessionInProgress) {
    sessionInProgress = false;
    // point React DevTools's global hook's onCommitFiber method from intercept's result
    // to point to the original method saved globally
    rdt.onCommitFiberRoot = rdtOnCommitFiberRoot;
  }
};

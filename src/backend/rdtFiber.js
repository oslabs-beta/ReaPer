import ReaperSession from './ReaperSession';
import RenderEvent from './RenderEvent';

// For access to React DevTools global hook for before and after record session
let rdt;
// For access to React devTools fiber root node in functions
let rdtFiberRootNode = null;
// For access to React devTools onCommitFiberRoot method to be initialized in connectToReact,
// and to be mutated in intercept function, and again in endReaperSession
let rdtOnCommitFiberRoot;
// Will initialize on a ReaperSession instantiation, but also accessed elsewhere
let reaperSession;
// Verification for session in progress
let sessionInProgress = false;

// To be invoked in intercept function's return function
// Formerly named "function b"
const updateRenderEvent = (fiberRootNode) => {
  // intantiate RenderEvent
  const newRenderEvent = new RenderEvent(rdtFiberRootNode);
  // add newRenderEvent to RenderEventList object on ReaperSession instantiation
  reaperSession.addRenderEvent(newRenderEvent);
};

// connect to React DevTools global hook
function connectToReact() {
  // __REACT_DEVTOOLS_GLOBAL_HOOK__ is a global object installed
  // by React Devtools extension's content script that gives access to React fiber nodes
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

    // intercept the original onCommitFiberRoot with middleware
    const intercept = function (rdtOnCommit) {
      return function (...args) {
        rdtFiberRootNode = args[1]; // root argument (args: rendererID, root, priorityLevel)
        // invoke function B here
        updateRenderEvent(rdtFiberRootNode);
        // return RDT's onCommitFiberRoot with its args
        return rdtOnCommitFiberRoot(...args);
      };
    };
    rdt.onCommitFiberRoot = intercept(rdt.onCommitFiberRoot); /// correct to intercept
  }
}

// When a user starts a record session startReaperSession will be invoked in the background script
export const startReaperSession = () => {
  // check current value of sessionInProgress, if true don't do anything
  if (!sessionInProgress) {
    sessionInProgress = true;
    reaperSession = new ReaperSession();
    connectToReact();
  }
};

// This function undoes what intercept function does
// It will be invoked once user stops recording session
export const endReaperSession = () => {
  // invoke
  // check if sessionInProgress is already false, if false, don't do anything.
  if (sessionInProgress) {
    sessionInProgress = false;
    // point React devTools's global hook's onCommitFiber method to intercept
    // to point to the original function saved
    rdt.onCommitFiberRoot = rdtOnCommitFiberRoot;
  }
};

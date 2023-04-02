import ReaperSession from './reaperSession';
import RenderEvent from './renderEvent';

// Set global variable to use across functions
// for access to React DevTools global hook for before and after record session
let rdt;
// for access to React devTools fiber root node
// let rdtFiberRootNode = null;
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
  const newRenderEvent = new RenderEvent(fiberRootNode);
  // add newRenderEvent to RenderEventList object on ReaperSession instantiation
  reaperSession.addRenderEvent(newRenderEvent);
};

// Limits calls made on a function (new render event) in a period of time
const throttle = (func, delay) => {
  let shouldWait = false;

  // return function that takes new render event's fiber node arg
  return (arg) => {
    if (shouldWait) return;

    func(arg);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
};

// Connect to React DevTools global hook
function connectToReact() {
  // __REACT_DEVTOOLS_GLOBAL_HOOK__ is a global object installed
  // by React Devtools (RDT) extension's content script that gives access to React fiber nodes
  rdt = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  // check if RDT's global object is installed
  if (!rdt) return;
  // Pass error message to the frontend if React devTools is not present
  // TODO: use sendMessageToDevTool method

  // check if application is a React application by checking for a React instance
  const isReact = rdt.renderers.get(1);
  if (!isReact) return;
  // Pass error message to the frontend if user application is not a React app
  // TODO: use sendMessageToDevTool method

  // get fiberNode information and intercept
  // rdtFiberRootNode = rdt.getFiberRoots(1).values().next().value;
  /*
  NY:
  let rdtFiberRootNode; // WHERE SHOULD throttleRenderEvent BE DECLARED? WHY?
  I placed it inside connectToReact because we would only need to check it
  when React is being used, but should it be closer to it's invocation?
  */

  // throttle render events
  const throttleRenderEvent = throttle(() => { updateRenderEvent(rdtFiberRootNode); }, 100);

  // intercept the original onCommitFiberRoot
  const intercept = function (originalOnCommitFiberRootFn) {
    // preserve origial onCommitFiberRoot
    rdtOnCommitFiberRoot = originalOnCommitFiberRootFn;

    return function (...args) {
      const rdtFiberRootNode = args[1]; // root argument (args: rendererID, root, priorityLevel)
      // Invoke updateRenderEvent
      updateRenderEvent(rdtFiberRootNode);
      // throttle renders
      throttleRenderEvent();
      // return RDT's onCommitFiberRoot with its args
      return originalOnCommitFiberRootFn(...args);
    };
  };
  rdt.onCommitFiberRoot = intercept(rdt.onCommitFiberRoot);
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

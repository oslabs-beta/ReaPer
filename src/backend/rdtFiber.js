import ReaperSession from './reaperSession';
import RenderEvent from './renderEvent';

// Set global variable to use across functions
// for access to React DevTools global hook for before and after record session
let rdt;
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
  // console.log('rdtFiber updateRenderEvent: received fiberRootNode', fiberRootNode);
  // intantiate RenderEvent
  const newRenderEvent = new RenderEvent(fiberRootNode);
  // add newRenderEvent to RenderEventList object on ReaperSession instantiation
  reaperSession.addRenderEvent(newRenderEvent);
};

// Limits calls made on a function (new render event) in a period of time
const throttle = (func, delayMS) => {
  let shouldWait = false;

  // return function that takes new render event's fiber node arg
  return (arg) => {
    if (shouldWait) {
      // console.log('throttle anonymous: shouldWait is true, returning....');
      return;
    }

    // console.log('throttle anonymous: shouldWait is false, invoking func now with arg', arg);
    func(arg);
    shouldWait = true;

    // console.log('throttle anonymous: invoking setTimeout with delay value', delayMS);
    setTimeout(() => {
      // console.log('setTimeout callback invoked, setting shouldWait to false');
      shouldWait = false;
    }, delayMS);
  };
};

// Connect to React DevTools global hook
function connectToReact() {
  console.log('rdtFiber connectToReact() invoked');
  // __REACT_DEVTOOLS_GLOBAL_HOOK__ is a global object installed
  // by React Devtools (RDT) extension's content script that gives access to React fiber nodes
  rdt = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  // check if RDT's global object is installed
  if (!rdt) {
    console.log('rdtFiber connectToReact(): React Dev Tools is not installed! Cannot connect.');
    return;
  }
  // Pass error message to the frontend if React devTools is not present
  // TODO: use sendMessageToDevTool method

  // check if application is a React application by checking for a React instance
  const isReact = rdt.renderers.get(1);
  if (!isReact) {
    console.log('rdtFiber connectToReact(): Application does not use React! Cannot connect.');
    return;
  }
  // Pass error message to the frontend if user application is not a React app
  // TODO: use sendMessageToDevTool method

  // throttle render events
  const throttleRenderEvent = throttle((fiberNode) => { updateRenderEvent(fiberNode); }, 100);

  // intercept the original onCommitFiberRoot
  const intercept = function (originalOnCommitFiberRootFn) {
    // preserve origial onCommitFiberRoot
    rdtOnCommitFiberRoot = originalOnCommitFiberRootFn;

    return function (...args) {
      const rdtFiberRootNode = args[1]; // root argument (args: rendererID, root, priorityLevel)
      // throttle renders
      throttleRenderEvent(rdtFiberRootNode);
      // return RDT's onCommitFiberRoot with its args
      return originalOnCommitFiberRootFn(...args);
    };
  };
  rdt.onCommitFiberRoot = intercept(rdt.onCommitFiberRoot);
}

// When a user starts a record session startReaperSession will be invoked in the background script
export const startReaperSession = () => {
  try {
    // console.log('rdtFiber: startReaperSession() invoked');
    // check current value of sessionInProgress
    if (!sessionInProgress) {
      // console.log('rdtFiber startReaperSession: starting reaper session');
      sessionInProgress = true;
      reaperSession = new ReaperSession();
      connectToReact();
    }
  } catch (error) {
    console.log('rdtFiber startReaperSession error:', error.message);
  }
};

// This function undoes what intercept function does
// It will be invoked once user stops recording session
export const endReaperSession = () => {
  try {
    console.log('rdtFiber: endReaperSession() invoked');
    // check if sessionInProgress is already false
    if (sessionInProgress) {
      // console.log('rdtFiber endReaperSession: session is in progress, stopping session now..');
      sessionInProgress = false;
      // point React DevTools's global hook's onCommitFiber method from intercept's result
      // to point to the original method saved globally
      rdt.onCommitFiberRoot = rdtOnCommitFiberRoot;
      // console.log('rdtFiber endReaperSession: session stopped, monkey patching undone');

      // Sometimes there can be circular references within the fiber node that causes issues
      // when trying to JSON stringify it - by passing in a custom replacer, we can just
      // replace circular references with the string '[Circular]' and complete the JSON
      // stringify process
      const getCircularReplacer = () => {
        const ancestors = [];
        return function (key, value) {
          if (typeof value !== 'object' || value === null) {
            return value;
          }
          // `this` is the object that value is contained in,
          // i.e., its direct parent.
          while (ancestors.length > 0 && ancestors.at(-1) !== this) {
            ancestors.pop();
          }
          if (ancestors.includes(value)) {
            return '[Circular]';
          }
          ancestors.push(value);
          return value;
        };
      };

      window.postMessage({ type: 'SEND_REAPER_SESSION', payload: JSON.stringify(reaperSession, getCircularReplacer()) }, '*');
    } else {
      console.log('rdtFiber endReaperSession: session not in progress, nothing to stop');
    }
  } catch (error) {
    console.log('rdtFiber endReaperSession error:', error.message);
  }
};

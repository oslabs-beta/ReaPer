import Tree from './tree';

// RenderEvent is instantiated when user starts recording
// Class is instantiated inside of updateRenderEvent function in rdtFiber.js
export class RenderEvent {
  constructor(fiberRootNode) {
    const { current } = fiberRootNode;
    // instantiate a Tree passing in the current property of React's FiberRootNode
    this.tree = new Tree(current);
  }
}

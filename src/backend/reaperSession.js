export class reaperSession {
  constructor {
    renderEventList: new Set();
  }
  addRenderEvent(renderEventObj) {
    this.renderEventList.add(renderEventObj)
  }
}
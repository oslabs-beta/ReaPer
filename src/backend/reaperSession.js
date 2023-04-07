class ReaperSession {
  constructor() {
    this.renderEventList = new Set();
  }
  addRenderEvent(renderEventObj) {
    this.renderEventList.add(renderEventObj);
  }
}

export default ReaperSession;


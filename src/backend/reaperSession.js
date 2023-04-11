class ReaperSession {
  constructor() {
    this.renderEventList = [];
  }
  addRenderEvent(renderEventObj) {
    this.renderEventList.push(renderEventObj);
  }
}

export default ReaperSession;


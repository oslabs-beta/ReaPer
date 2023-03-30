let currentTab;
let bgPort;
class Tab {
  constructor(tabTitle, tabId) {
    this.tabTitle = tabTitle;
    this.tabId = tabId;
  }
}

/**
 * Sets or updates the activeTab object
 * @param tabTitle - The title of the current tab
 * @param tabId - The id of the current tab
 */
const setTab = (tabTitle, tabId) => {
  if (currentTab !== undefined) {
    console.log('background.js: Existing tab data being overwritten: tabTitle=', currentTab.tabTitle, 'tabId=', currentTab.tabId);
  }
  console.log('background.js: new tab data, tabTitle=', tabTitle, 'tabId=', tabId);
  currentTab = new Tab(tabTitle, tabId);
};

/**
 * Invoked when a message from the dev tool has been received.
 * @param msg (object)
 */
const onMessageFromDevTool = msg => {
  console.log('background.js received a message from the dev tool:', msg);
};

const sendMessageToDevTool = msg => {
  if (bgPort === undefined) {
    console.log('background.js: no port to send message to!');
    return;
  }
  console.log('background.js sending message to dev tool:', msg);
  bgPort.postMessage({ message: msg });
};

const handleMessageFromContentScript = (request, sender, sendResponse) => {
  console.log('background.js received message:', request.message);

  const tabTitle = sender.tab.title;
  const tabId = sender.tab.id;
  setTab(tabTitle, tabId);
};

const sendMessageToContentScript = msg => {
  if (currentTab === undefined) {
    console.log('background.js: no tab to send message to');
    return;
  }
  console.log('background.js sending message to content.js:', msg);
  chrome.tabs.sendMessage(currentTab.tabId, msg);
};

/**
 * Establish connection with dev tool.
 * This will not fire until chrome.runtime.connect is invoked on the front end.
 */
chrome.runtime.onConnect.addListener(port => {
  // Attach an event listener to each port for messages from the dev tool
  port.onMessage.addListener(onMessageFromDevTool);

  bgPort = port;

  // Send a test message
  // sendMessageToDevTool('hello from background.js!');
});

/**
Set up listener for messages from content script
*/
chrome.runtime.onMessage.addListener(handleMessageFromContentScript);


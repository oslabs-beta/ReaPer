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

  switch (msg.type) {
    case 'START_RECORDING':
      injectScriptToStartReaperSession();
      break;
    case 'END_RECORDING':
      break;
    default:
      console.log('Background Script: ERROR - Unknown message type!', msg.type);
  }
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

/*
- This function will inject backend/index.js into the current tab.
- When backend/index.js runs, it will run the imported startReaperSession() from rdtFiber,
which will connect to the react devtools global hook for the user's current tab.
- This seems to be the ONLY way to connect to the react devtools global hook
*/
const injectScriptToStartReaperSession = () => {
  const injectScript = (file, tab) => {
    try {
      const htmlBody = document.getElementsByTagName('body')[0];
      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', file);
      htmlBody.appendChild(script);
    } catch (error) {
      console.log('background error:', error.message);
    }
  };
  const tmpTabId = currentTab.tabId;
  chrome.scripting.executeScript({
    target: { tabId: tmpTabId },
    function: injectScript,
    args: [chrome.runtime.getURL('bundles/backend.bundle.js'), tmpTabId],
    injectImmediately: true,
  });
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

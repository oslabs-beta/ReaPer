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
    console.log('background.js: Existing tab data being overwritten: tabTitle=', currentTab.tabTitle, 'tabId=', currentTab.tabId); // LOGS 2ND
  }
  console.log('background.js: new tab data, tabTitle=', tabTitle, 'tabId=', tabId);
  currentTab = new Tab(tabTitle, tabId);
};

function getCurrentTab(resetTab = false) {
  try {
    if (currentTab === undefined || resetTab) {
      // Retrieve the active tab from currently-focused window (or most recently-focused window)
      const queryOptions = { active: true, lastFocusedWindow: true };
      // 'tab' will either be a 'tab.Tab' instance or 'undefined'
      const [tab] = chrome.tabs.query(queryOptions)
        .then(result => {
          console.log('result received:', result);
        })
        .catch (error => console.log(error));
      // await console.log('This is current tab object: ', tab);
      // await console.log('This is current tabTitle: ', tab.title);
      // await console.log('This is current tabId: ', tab.id);
      // currentTab = new Tab(tab.title, tab.id);
    }

    return currentTab;
  } catch (error) {
    console.log('background getCurrentTab error:', error.message);
  }
}

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
      sendMessageToContentScript({ type: 'END_RECORDING', payload: {} });
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
  console.log('background.js received message:', request.message); // LOGS 1ST
};

const sendMessageToContentScript = msg => {
  // if (currentTab === undefined) {
  //   console.log('background.js: no tab to send message to');
  //   return;
  // }
  console.log('background.js sending message to content.js:', msg);
  chrome.tabs.sendMessage(getCurrentTab().tabId, msg);
};

/*
- This function will inject backend/index.js into the current tab.
- When backend/index.js runs, it will run the imported startReaperSession() from rdtFiber,
which will connect to the react devtools global hook for the user's current tab.
- This seems to be the ONLY way to connect to the react devtools global hook
*/
const injectScriptToStartReaperSession = () => {
  console.log('Background Script: injectScriptToStartReaperSession() invoked');

  const injectScript = (file) => {
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

  getCurrentTab(true);

  // console.log('background injectScriptToStartReaperSession: result of getCurrentTab=', getCurrentTab());
  // const tmpTabId = getCurrentTab(true).tabId;
  // console.log('Testing if tabId being passed into injectScript func is the same: ', tmpTabId);
  // chrome.scripting.executeScript({
  //   target: { tabId: tmpTabId },
  //   function: injectScript,
  //   args: [chrome.runtime.getURL('bundles/backend.bundle.js')],
  //   injectImmediately: true,
  // });
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
try {
  chrome.runtime.onMessage.addListener(handleMessageFromContentScript);
} catch (error) {
  console.log('background.js error:', error.message);
}

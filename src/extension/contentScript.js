/**
 * Sends a message to background.js.
 * @param {string} msg - Message to send to background.js
 */
const sendMessageToBackground = (msg) => {
  console.log('contentScript.js: sending message to background script:', msg);
  // The parameter passed in to sendMessage must be a JSON-ifiable object.
  chrome.runtime.sendMessage(msg);
};

/**
 * Invoked when a message is received from background.js
 * @param {object} msg - The message from background.js
 */
const handleMessageFromBackground = msg => {
  console.log('contentScript.js: received message from background:', msg);

  switch (msg.type) {
    case 'END_RECORDING':
      document.dispatchEvent(new CustomEvent('endReaperSession'));
      break;
    default:
      console.log('Content Script: ERROR - Unknown message type!', msg.type);
  }

  return false;
};

const handleWindowMessages = msg => {
  if (Object.hasOwn(msg.data, 'type')) {
    console.log('contentScript: received message', msg.data);
    switch (msg.data.type) {
      case 'SEND_REAPER_SESSION':
        const bgMsg = { type: 'SEND_REAPER_SESSION', payload: msg.data.payload };
        sendMessageToBackground(bgMsg);
        break;
      default:
    }
  }
};

sendMessageToBackground('HELLO FROM CONTENT.JS');

/**
Set up listener for messages from the background script
*/
chrome.runtime.onMessage.addListener(handleMessageFromBackground);

/**
 * Set up listener for messages from the window
 */
window.addEventListener('message', handleWindowMessages);

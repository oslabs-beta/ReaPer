/**
 * Sends a message to background.js.
 * @param {string} msg - Message to send to background.js
 */
const sendMessageToBackground = (msg) => {
  console.log('contentScript.js: sending message to background script:', msg);
  // The parameter passed in to sendMessage must be a JSON-ifiable object.
  chrome.runtime.sendMessage({ message: msg });
};

/**
 * Invoked when a message is received from background.js
 * @param {object} msg - The message from background.js
 */
const handleMessageFromBackground = msg => {
  console.log('contentScript.js: received message from background:', msg);
  return false;
};

sendMessageToBackground('HELLO FROM CONTENT.JS');

/**
Set up listener for messages from the background script
*/
chrome.runtime.onMessage.addListener(handleMessageFromBackground);

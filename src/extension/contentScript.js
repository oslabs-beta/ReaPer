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
  // console.log('window:', Window);
  // console.log(Window.__REACT_DEVTOOLS_GLOBAL_HOOK);
  // console.log(Window.document.title);
  return false;
};

sendMessageToBackground('HELLO FROM CONTENT.JS');

/**
Set up listener for messages from the background script
*/
chrome.runtime.onMessage.addListener(handleMessageFromBackground);


// const url = chrome.runtime.getURL('./bundles/backend.bundle.js');

// const scriptElement = document.createElement('script');
// scriptElement.onload = function () {
//   //window.myFunction(); // This will invoke the myFunction function
//   console.log('hellllllllllllllllllllllllllllllllllllllllllllllllllo');
// };
// scriptElement.src = url;
// document.head.appendChild(scriptElement);

// (async () => {
//   const src = chrome.runtime.getURL('bundles/backend.bundle.js');
//   const contentMain = await import(src);
//   await contentMain.default();
// })();

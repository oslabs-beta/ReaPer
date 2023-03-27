const sendMessageToBackground = (msg) => {
    // The message should be a JSON-ifiable object.
    console.log('content.js sending message to background script:', msg);
    chrome.runtime.sendMessage({ message: msg} );
  }
  
  const handleMessageFromBackground = msg => {
    console.log('content.js received message from background:', msg);
    return false;
  }
  
  sendMessageToBackground('HELLO FROM CONTENT.JS');
  
  /**
  Set up listener for messages from the background script
  */
  chrome.runtime.onMessage.addListener(handleMessageFromBackground);
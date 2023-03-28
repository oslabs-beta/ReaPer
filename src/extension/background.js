/**
 * Invoked when a message from the dev tool has been received.
 * @param msg (object) - 
 */
const onMessageFromDevTool = msg => {
  console.log('background.js received a message from the dev tool:', msg.message);
  sendMessageToContentScript(msg.message);
}
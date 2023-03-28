/**
 * Invoked when a message from the dev tool has been received.
 * @param msg (object) - Object with a "message" property containing the message
 */
const onMessageFromDevTool = msg => {
  console.log('background.js received a message from the dev tool:', msg.message);
  
}
import React, { useRef, useEffect, useCallback, useState } from 'react';
import MainNav from './components/MainNav';
import Context from './contexts/Context';
import createMessageObj from '../backend/helperFns';
import types from '../backend/types';
import ComponentTree from './components/ComponentTree.jsx';
import RenderEvents from './components/RenderEvents';
import ComponentsRanked from './components/ComponentsRanked';
import RenderedComponents from './components/RenderedComponents';
import StartView from './components/StartView';
import SessionProgress from './components/SessionProgress';

function App() {
  const appRef = useRef({});
  // If sessionStatus is false, then no session recording is currently in progress
  const [sessionStatus, setSessionStatus] = useState(false);

  useEffect(() => {
    connectToBackgroundScript();
  }, []);

  // Use the useCallback hook here so we can cache the function definition
  // of sendMessageTobackground
  const sendMessageToBackground = useCallback((msgObj) => {
    console.log(
      'dev tool front end sending message to background script:',
      msgObj
    );
    if (appRef.current.port === null || appRef.current.port === undefined) {
      console.log('No port, exiting...');
      return;
    }

    appRef.current.port.postMessage(msgObj);
  }, []);

  /**
   * Invoked when a message is received from the background script
   * Parameters must be in the following format:
   * (message: any, sender: MessageSender, sendResponse: function) => boolean | undefined
   * See: https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
   */
  const handleMessageFromBackground = (msg, sender, sendResponse) => {
    console.log('dev tool received message from background:', msg.message);
    sendMessageToBackground('hello from App.jsx!');
  };

  /**
   * Establishes long-lived connection with background script
   * Sets up listener for messages from the background script
   */
  const connectToBackgroundScript = () => {
    if (appRef.current.port !== undefined) return;

    console.log('App.jsx: Connecting to background script');
    const bgPort = chrome.runtime.connect();

    bgPort.onMessage.addListener(handleMessageFromBackground);

    appRef.current.port = bgPort;
  };

  const handleRecordBtnClick = () => {
    // We want to flip the value of sessionStatus
    // Therefore, the value of type will correspond to sessionStatus's flipped value
    const type = sessionStatus ? types.END_RECORDING : types.START_RECORDING;
    const msgObj = createMessageObj(type, {});
    sendMessageToBackground(msgObj);
    setSessionStatus(!sessionStatus);
  };

  return (
    <div id='container'>
      <Context.Provider value={sendMessageToBackground}>
        <MainNav handleRecordBtnClick={handleRecordBtnClick} />
        {/* <SessionProgress /> */}
        {/* <StartView /> */}
        <div id='content'>
          <div className='row'>
            <div className='column'>
              <div className='graph'>
                <RenderEvents />
              </div>
            </div>
            <div className='column'>
              <div className='graph'>
                <RenderedComponents />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='column'>
              <div className='graph'>
                <ComponentsRanked />
              </div>
            </div>
            <div className='column'>
              <div className='graph'>
                <ComponentTree />
              </div>
            </div>
          </div>
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;

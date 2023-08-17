import React, { useRef, useEffect, useCallback, useState } from 'react';
import MainNav from './components/MainNav';
import createMessageObj from '../backend/helperFns';
import types from '../backend/types';
import StartView from './components/StartView';
import SessionProgress from './components/SessionProgress';
import Dashboard from './components/Dashboard';

function App() {
  const appRef = useRef({});
  // If sessionStatus is false, then no session recording is currently in progress
  const [sessionStatus, setSessionStatus] = useState(false);
  const [reaperSession, setReaperSession] = useState(null);
  // let reaperSessionObj;

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
  const handleMessageFromBackground = (request, sender, sendResponse) => {
    try {
      console.log(
        'dev tool received message from background:',
        request.message
      );
      switch (request.message.type) {
        case 'SEND_REAPER_SESSION':
          // reaperSessionObj = JSON.parse(request.message.payload);
          // setReaperSession(JSON.parse(request.message.payload));
          // console.log('This is a reaperSessionObj', reaperSession);
          const rs = JSON.parse(request.message.payload);
          setReaperSession(rs);
          break;
        default:
          console.log('App.jsx: unknown message type!', request.message.type);
      }
    } catch (error) {
      console.log('App.jsx error:', error.message);
    }
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

  // Logic from line 95 - 103 is used to determine what screen will display
  //  StartView: If there is no session recording and no reaperSession object saved
  //  SessionProgress: If there is a session recording and no reaperSession object saved.
  //                   If there is a session recording and there is a reaperSession object saved.
  //  Dashboard: If there is no session recording and there is a reaperSession object saved.
  return (
    <div id='container'>
      <MainNav handleRecordBtnClick={handleRecordBtnClick} sessionStatus={sessionStatus} />
      {!sessionStatus && !reaperSession ? (
        <StartView />
      ) : (sessionStatus && !reaperSession) ||
        (sessionStatus && reaperSession) ? (
        <SessionProgress />
      ) : (
        !sessionStatus &&
        reaperSession && <Dashboard reaperSessionObj={reaperSession} />
      )}
    </div>
  );
}

export default App;

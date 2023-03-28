import React, { createContext, useContext, useRef } from 'react';

// Create a new context opj to store port connection
export const PortContext = createContext(null);

// Get the current port connection
export function usePort() {
  // Declare a ref to hold the port connection
  const portRef = useRef(null);

  // Check if the port connection has not yet been set
  if (!portRef.current) {
    // If not, set the port connection
    portRef.current = chrome.runtime.connect();
  }
  return portRef.current;
}

// Disconnect the port connection
export function useDisconnectPort() {
  // Get the current port from PortContext with useContext
  const port = useContext(PortContext);

  // Disconnect the port connection
  return function disconnectPort() {
    if (port) {
      port.disconnect();
    }
  };
}

// import { createContext, useContext, useRef } from 'react';
// // Create new context obj
// export const PortContext = createContext(null);

// // New component to provide the port context to child components
// export function PortProvider({ children }) {
//   // Declare a state var to hold the port connection
//   // useRef, use conext would store msg
//   const [port, setPort] = useState(null);

//   // UseEffect to set up the port connection
//   useEffect(() => {
//     // Check if port has not yet been set
//     if (!port) {
//       // connect with background script
//       const currentPort = chrome.runtime.connect();
//       // Update the port state with current port
//       setPort(currentPort);
//     }

//     // Disconnect the port when the component unmounts
//     return () => {
//       if (port) {
//         // Disconnect the current port
//         port.disconnect();
//         // Reset port state
//         setPort(null);
//       }
//     };
//   }, [port]);

//   // Return the PortConext provider with value set to current port
//   return <PortContext.Provider value={port}>{children}</PortContext.Provider>;
// }

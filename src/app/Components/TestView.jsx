import React, { useState } from 'react';

const TestView = props => {
  const [counter, setCounter] = useState(0);

  const onButtonClick = () => {
    setCounter(counter + 1);
  }

  return (
    <div>
      <button id="clickMeBtn" onClick={onButtonClick}>Click Me</button>
      <div>The button has been clicked {counter} times.</div>
    </div>
  );
};

export default TestView;
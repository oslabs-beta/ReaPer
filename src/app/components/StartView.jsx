import React from 'react';
import reaperLogo from '../../extension/assets/reaper-128.png';

function StartView() {
  return (
    <div className='start-view'>
      <div className='skull-icon-container'>
        <img src={reaperLogo} alt="reaper logo" />
      </div>
      <div className='start-text'>
        No Session data to display. Click on the record button to start a
        session or open a past session to view.
      </div>
    </div>
  );
}

export default StartView;

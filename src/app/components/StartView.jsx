import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';
import MainNav from './MainNav';

function StartView() {
  return (
    <div className='start-view'>
      {/* <MainNav /> */}
      <div className='skull-icon-container'>
        <FontAwesomeIcon icon={faSkull} size='4x' color='white' />
      </div>
      <div className='start-text'>
        No Session data to display. Click on the record button to start a
        session or open a past session to view.
      </div>
    </div>
  );
}

export default StartView;

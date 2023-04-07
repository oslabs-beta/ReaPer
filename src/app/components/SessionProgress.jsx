import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import MainNav from './MainNav';

function SessionProgress() {
  return (
    <div className='session-view'>
      {/* <MainNav /> */}
      <div className='react-icon-container'>
        <FontAwesomeIcon icon={faReact} size='6x' color='#61DBFB' />
      </div>
      <div className='start-text'>Session recording in progress</div>
    </div>
  );
}

export default SessionProgress;

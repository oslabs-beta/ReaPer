import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import MainNav from './MainNav';

function SessionProgress() {
  return (
    <div className='start-view'>
      <MainNav />
      <FontAwesomeIcon icon={faReact} size='4x' color='#61DBFB' />
      <div className='start-text'>Session recording in progress</div>
    </div>
  );
}

export default SessionProgress;
